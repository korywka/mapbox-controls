import { FeatureCollection } from 'geojson';
import { Expression, GeoJSONSource, ImageSource, LngLat, MapMouseEvent, StyleFunction } from 'mapbox-gl';
import Base from '../Base/Base';
import Button from '../Button/Button';
import iconImage from '../icons/image';
import IImage from './IImage';

enum Cursor {
  Default = '',
  Move = 'move',
  Grabbing = 'grabbing',
}

export default class ImageControl extends Base {
  button: Button
  mapCanvas: HTMLCanvasElement
  mapContainer: HTMLElement
  fileInput: HTMLInputElement
  images: IImage[]
  selectedImageId: string | null
  disableDragging: () => void

  constructor() {
    super();
    this.button = new Button();
    this.fileInput = document.createElement('input');
    this.fileInput.type = 'file';
    this.fileInput.accept = '.jpg, .jpeg, .png';
    this.images = [];
    this.selectedImageId = null;
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
    const files = this.fileInput.files;
    Array.from(files).forEach(async (file) => {
      const image = new IImage();
      await image.load(file);
      image.setInitialPosition(this.map);
      this.images.push(image);
      this.drawImage(image);
    });
  }

  drawImage(image: IImage) {
    this.map.addSource(image.imageSource.id, image.imageSource.source);
    this.map.addSource(image.vectorSource.id, image.vectorSource.source);
    this.map.addLayer(image.rasterLayer);
    this.map.addLayer(image.fillLayer);
    this.map.addLayer(image.contourLayer);
  }

  onMapClick(event: MapMouseEvent) {
    const contourLayersId = this.images.map(i => i.fillLayer.id);
    const features = this.map.queryRenderedFeatures(event.point, { layers: contourLayersId });
    if (features.length) {
      this.selectImage(features[0].properties.id as string);
    } else {
      this.deselectImage();
    }
  }

  enableDragging(id: string) {
    const image = this.images.find(i => i.id === id);
    let startPosition: LngLat = null;
    this.mapCanvas.style.cursor = Cursor.Move;

    const onPointerMove = (event: MapMouseEvent) => {
      const currentPosition = event.lngLat;
      this.mapCanvas.style.cursor = Cursor.Grabbing;
      const deltaLng = startPosition.lng - currentPosition.lng;
      const deltaLat = startPosition.lat - currentPosition.lat;
      image.position = image.position.map(coords => [coords[0] - deltaLng, coords[1] - deltaLat]);
      this.applyTransform(image);
      startPosition = currentPosition;
    };

    const onPointerUp = () => {
      this.mapCanvas.style.cursor = Cursor.Move;
      this.map.off('mousemove', onPointerMove);
      this.map.setPaintProperty(image.contourLayer.id, 'line-opacity', 1);
    };

    const onPointerDown = (event: MapMouseEvent) => {
      event.preventDefault();
      this.mapCanvas.style.cursor = Cursor.Grabbing;
      startPosition = event.lngLat;
      this.map.on('mousemove', onPointerMove);
      this.map.once('mouseup', onPointerUp);
      this.map.setPaintProperty(image.contourLayer.id, 'line-opacity', 0);
    };

    const onPointerEnter = () => {
      this.mapCanvas.style.cursor = Cursor.Move;
    };

    const onPointerLeave = () => {
      this.mapCanvas.style.cursor = Cursor.Default;
    };

    this.map.on('mouseenter', image.fillLayer.id, onPointerEnter);
    this.map.on('mouseleave', image.fillLayer.id, onPointerLeave);
    this.map.on('mousedown', image.fillLayer.id, onPointerDown);

    this.disableDragging = () => {
      this.map.off('mouseenter', image.fillLayer.id, onPointerEnter);
      this.map.off('mouseleave', image.fillLayer.id, onPointerLeave);
      this.map.off('mousedown', image.fillLayer.id, onPointerDown);
    };
  }

  selectImage(id: string) {
    if (this.selectedImageId === id) return;
    if (this.selectedImageId) this.deselectImage();
    const image = this.images.find(i => i.id === id);
    this.map.setPaintProperty(image.contourLayer.id, 'line-opacity', 1);
    this.enableDragging(id);
    this.selectedImageId = id;
  }

  deselectImage() {
    if (!this.selectedImageId) return;
    const image = this.images.find(i => i.id === this.selectedImageId);
    this.map.setPaintProperty(image.contourLayer.id, 'line-opacity', 0);
    this.disableDragging();
    this.selectedImageId = null;
  }

  applyTransform(image: IImage) {
    const imageSource = this.map.getSource(image.imageSource.id) as ImageSource;
    const vectorSource = this.map.getSource(image.vectorSource.id) as GeoJSONSource;
    imageSource.setCoordinates(image.position);
    vectorSource.setData(image.asPolygon);
  }

  onAddControl() {
    this.insert();
    // if (this.map.isStyleLoaded()) this.draw();
    // this.map.on('style.load', this.draw);
    this.mapContainer = this.map.getContainer();
    this.mapCanvas = this.map.getCanvas();
    this.map.on('click', this.onMapClick);
  }
}
