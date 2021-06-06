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
    this.images = [];
    this.editMode = null;
    this.selectedImage = null;
    this.onMapClick = this.onMapClick.bind(this);
    this.onFileInputChange = this.onFileInputChange.bind(this);
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
      const image = new IImage();
      await image.load(file);
      image.setInitialPosition(this.map);
      this.images.push(image);
      this.drawImage(image);
      this.selectImage(image.id);
    });
  }

  drawImage(image: IImage) {
    this.map.addSource(image.imageSource.id, image.imageSource.source);
    this.map.addSource(image.shapeSource.id, image.shapeSource.source);
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
  }

  deselectImage() {
    if (!this.selectedImage) return;
    if (this.editMode === EditMode.Move) {
      this.movingOff();
    } else if (this.editMode === EditMode.Transform) {
      this.transformOff();
    }
    this.selectedImage = null;
    this.editMode = null;
  }

  updateImageSource(position: ImagePosition) {
    const selectedImage = this.selectedImage;
    selectedImage.position = position;
    (this.map.getSource(selectedImage.imageSource.id) as ImageSource).setCoordinates(selectedImage.coordinates);
    (this.map.getSource(selectedImage.shapeSource.id) as GeoJSONSource).setData(selectedImage.asPolygon);
    (this.map.getSource(selectedImage.cornersSource.id) as GeoJSONSource).setData(selectedImage.asPoints);
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
