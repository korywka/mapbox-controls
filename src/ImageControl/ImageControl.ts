import { GeoJSONSource, ImageSource, MapMouseEvent } from 'mapbox-gl';
import Base from '../Base/Base';
import Button from '../Button/Button';
import iconImage from '../icons/image';
import IImage from './IImage';
import { EditMode, ImagePosition } from './types';
import moveable from './moveable';
import resizeable from './resizeable';

export default class ImageControl extends Base {
  button: Button
  mapContainer: HTMLElement
  fileInput: HTMLInputElement
  images: IImage[]
  editMode?: EditMode
  selectedImage?: IImage
  movingOff?: () => void
  transformOff?: () => void

  constructor() {
    super();
    this.button = new Button();
    this.fileInput = document.createElement('input');
    this.fileInput.type = 'file';
    this.fileInput.accept = '.jpg, .jpeg, .png';
    this.fileInput.multiple = true;
    this.images = [];
    this.editMode = null;
    this.selectedImage = null;
    this.onMapClick = this.onMapClick.bind(this);
    this.onFileInputChange = this.onFileInputChange.bind(this);
    this.keyDownListener = this.keyDownListener.bind(this);
  }

  insert() {
    this.addClassName('mapbox-control-image');
    this.button.setIcon(iconImage());
    this.addButton(this.button);
    this.node.appendChild(this.fileInput);
    this.button.onClick(() => this.fileInput.click());
    this.fileInput.addEventListener('change', this.onFileInputChange);
  }

  onFileInputChange() {
    Array.from(this.fileInput.files).forEach(async (file, index) => {
      const image = await this.addImage(file);
      if (this.fileInput.files.length - 1 === index) this.selectImage(image.id);
    });
  }

  async addImage(data: File | string, options: { position?: ImagePosition } = {}): Promise<IImage> {
    const image = new IImage();
    if (typeof data === 'string') {
      await image.loadUrl(data);
    } else if (data) {
      await image.loadFile(data);
    } else {
      throw Error('file or url is required');
    }
    if (options.position) {
      image.position = options.position;
    } else {
      image.setInitialPosition(this.map);
    }
    this.images.push(image);
    this.drawImage(image);
    this.map.fire('image.add', image);
    return image;
  }

  drawImage(image: IImage) {
    this.map.addSource(image.imageSource.id, image.imageSource.source);
    this.map.addSource(image.polygonSource.id, image.polygonSource.source);
    this.map.addSource(image.cornersSource.id, image.cornersSource.source);
    this.map.addLayer(image.rasterLayer);
    this.map.addLayer(image.fillLayer);
  }

  redraw() {
    this.images.forEach(image => this.drawImage(image));
    if (this.movingOff) {
      this.movingOff();
    }
    if (this.transformOff) {
      this.transformOff();
    }
  }

  onMapClick(event: MapMouseEvent) {
    const imageFillLayersId = this.images.map(i => i.fillLayer.id);
    const features = this.map.queryRenderedFeatures(event.point, { layers: imageFillLayersId });
    if (features.length) {
      this.selectImage(features[0].properties.id as string);
    } else {
      this.deselectImage();
    }
  }

  movingOn() {
    this.movingOff = moveable(this.map, this.selectedImage, ((position) => {
      this.updateImageSource(position as ImagePosition);
    }));
  }

  transformOn() {
    this.transformOff = resizeable(this.map, this.selectedImage, ((position) => {
      this.updateImageSource(position as ImagePosition);
    }));
  }

  selectImage(id: string) {
    if (this.selectedImage && this.selectedImage.id !== id) this.deselectImage();
    this.selectedImage = this.images.find(i => i.id === id);
    if (!this.editMode) {
      this.editMode = EditMode.Move;
      this.movingOn();
    } else if (this.editMode === EditMode.Move) {
      this.editMode = EditMode.Transform;
      this.movingOff();
      this.transformOn();
    }
    this.map.fire('image.select', this.selectedImage);
    document.addEventListener('keydown', this.keyDownListener);
  }

  deselectImage() {
    if (!this.selectedImage) return;
    if (this.editMode === EditMode.Move) {
      this.movingOff();
    } else if (this.editMode === EditMode.Transform) {
      this.transformOff();
    }
    this.map.fire('image.deselect', this.selectedImage);
    this.selectedImage = null;
    this.editMode = null;
    document.removeEventListener('keydown', this.keyDownListener);
  }

  updateImageSource(position: ImagePosition) {
    const selectedImage = this.selectedImage;
    selectedImage.position = position;
    (this.map.getSource(selectedImage.imageSource.id) as ImageSource).setCoordinates(selectedImage.coordinates);
    (this.map.getSource(selectedImage.polygonSource.id) as GeoJSONSource).setData(selectedImage.asPolygon);
    (this.map.getSource(selectedImage.cornersSource.id) as GeoJSONSource).setData(selectedImage.asPoints);
    this.map.fire('image.update', this.selectedImage);
  }

  keyDownListener(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.deselectImage();
    }
  }

  onAddControl() {
    if (this.map.isStyleLoaded()) {
      this.insert();
    } else {
      this.map.once('style.load', () => this.insert());
    }
    this.map.on('style.load', () => this.redraw());
    this.mapContainer = this.map.getContainer();
    this.map.on('click', this.onMapClick);
  }
}
