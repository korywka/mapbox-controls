import { GeoJSONSource, ImageSource, LngLat, MapMouseEvent } from 'mapbox-gl';
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
  editMode: EditMode
  selectedImage?: IImage
  cursorPosition?: LngLat
  movingModeOff?: () => void
  transformModeOff?: () => void

  constructor() {
    super();
    this.button = new Button();
    this.fileInput = document.createElement('input');
    this.fileInput.type = 'file';
    this.fileInput.accept = '.jpg, .jpeg, .png';
    this.fileInput.multiple = true;
    this.images = [];
    this.editMode = EditMode.None;
    this.selectedImage = null;
    this.cursorPosition = null;
    this.insert = this.insert.bind(this);
    this.redraw = this.redraw.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onFileInputChange = this.onFileInputChange.bind(this);
    this.keyDownListener = this.keyDownListener.bind(this);
    this.mouseMoveListener = this.mouseMoveListener.bind(this);
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
    Array.from(this.fileInput.files).forEach(async (file) => {
      await this.addImage(file);
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
    if (this.movingModeOff) {
      this.movingModeOff();
    }
    if (this.transformModeOff) {
      this.transformModeOff();
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

  movingModeOn() {
    this.movingModeOff = moveable({
      map: this.map,
      image: this.selectedImage,
      cursorPosition: this.cursorPosition,
      onUpdate: (position) => {
        this.updateImageSource(position as ImagePosition);
      },
    });
  }

  transformModeOn() {
    this.transformModeOff = resizeable({
      map: this.map,
      image: this.selectedImage,
      onUpdate: ((position) => {
        this.updateImageSource(position as ImagePosition);
      }),
    });
  }

  selectImage(id: string) {
    if (this.selectedImage && this.selectedImage.id !== id) this.deselectImage();
    const selectedImage = this.images.find(i => i.id === id);
    if (selectedImage.locked) return;

    this.selectedImage = selectedImage;

    if (this.editMode === EditMode.None) {
      this.editMode = EditMode.Move;
      this.movingModeOn();
    } else if (this.editMode === EditMode.Move) {
      this.editMode = EditMode.Transform;
      this.movingModeOff();
      this.transformModeOn();
    }

    this.map.fire('image.select', this.selectedImage);
    document.addEventListener('keydown', this.keyDownListener);
  }

  deselectImage() {
    if (!this.selectedImage) return;
    if (this.editMode === EditMode.Move) {
      this.movingModeOff();
    } else if (this.editMode === EditMode.Transform) {
      this.transformModeOff();
    }
    this.map.fire('image.deselect', this.selectedImage);
    this.selectedImage = null;
    this.editMode = EditMode.None;
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

  setLock(imageId: string, value: boolean) {
    const image = this.images.find(i => i.id === imageId);
    if (!image) throw Error(`image with id ${imageId} doesn't exist`);
    image.locked = value;
  }

  keyDownListener(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.deselectImage();
    }
  }

  mouseMoveListener(event: MapMouseEvent) {
    this.cursorPosition = event.lngLat;
  }

  onAddControl() {
    this.mapContainer = this.map.getContainer();
    if (this.map.isStyleLoaded()) {
      this.insert();
    } else {
      this.map.once('style.load', this.insert);
    }
    this.map.on('style.load', this.redraw);
    this.map.on('click', this.onMapClick);
    this.map.on('mousemove', this.mouseMoveListener);
  }

  onRemoveControl() {
    this.map.off('style.load', this.insert);
    this.map.off('style.load', this.redraw);
    this.map.off('click', this.onMapClick);
    this.map.off('mousemove', this.mouseMoveListener);
  }
}
