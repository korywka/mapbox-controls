import { GeoJSONSource, ImageSource, LngLat, MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';
import Base from '../Base/Base';
import Button from '../Button/Button';
import iconImage from '../icons/image';
import IImage from './IImage';
import getClosestPoint from './getClosestPoint';
import draggableLayer from './draggableLayer';
import { EditMode, Cursor, ImagePosition, Visibility } from './types';
import { highlightLayer, highlightLayerId, resizeLayer, resizeLayerId } from './controlLayers';

export default class ImageControl extends Base {
  button: Button
  mapCanvas: HTMLCanvasElement
  mapContainer: HTMLElement
  fileInput: HTMLInputElement
  images: IImage[]
  editMode?: EditMode
  selectedImage?: IImage
  modeMovingOff?: () => void
  modeResizingOff?: () => void

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
    this.map.addLayer(image.eventCaptureLayer);
  }

  onMapClick(event: MapMouseEvent) {
    const contourLayersId = this.images.map(i => i.eventCaptureLayer.id);
    const features = this.map.queryRenderedFeatures(event.point, { layers: contourLayersId });
    if (features.length) {
      this.selectImage(features[0].properties.id as string);
    } else {
      this.deselectImage();
    }
  }

  modeMovingOn() {
    let startPosition: LngLat = null;
    const selectedImage = this.selectedImage;
    const eventCaptureLayerId = selectedImage.eventCaptureLayer.id;
    const draggableLayerCleanup = draggableLayer(this.map, eventCaptureLayerId, {
      onStart: (event: MapLayerMouseEvent) => {
        startPosition = event.lngLat;
        this.map.setLayoutProperty(highlightLayerId, 'visibility', Visibility.None);
        this.mapCanvas.style.cursor = Cursor.Grabbing;
      },
      onMove: (event: MapMouseEvent) => {
        const currentPosition = event.lngLat;
        const deltaLng = startPosition.lng - currentPosition.lng;
        const deltaLat = startPosition.lat - currentPosition.lat;
        const movedPosition = selectedImage.position.map(p => new LngLat(p.lng - deltaLng, p.lat - deltaLat));
        this.updateImageSource(movedPosition as ImagePosition);
        startPosition = currentPosition;
      },
      onEnd: () => {
        this.map.setLayoutProperty(highlightLayerId, 'visibility', Visibility.Visible);
        this.mapCanvas.style.cursor = Cursor.Move;
      },
      onPointerEnter: () => {
        this.mapCanvas.style.cursor = Cursor.Move;
      },
      onPointerLeave: () => {
        this.mapCanvas.style.cursor = '';
      },
    });

    this.map.addLayer(highlightLayer(this.selectedImage));

    this.modeMovingOff = () => {
      draggableLayerCleanup();
      this.map.removeLayer(highlightLayerId);
      this.mapCanvas.style.cursor = '';
    };
  }

  moveResizingOn() {
    let currentIndex: number;
    const selectedImage = this.selectedImage;
    const draggableLayerCleanup = draggableLayer(this.map, resizeLayerId, {
      onStart: (event: MapLayerMouseEvent) => {
        currentIndex = event.features[0].properties.index;
        this.map.setLayoutProperty(highlightLayerId, 'visibility', Visibility.None);
        this.map.setLayoutProperty(resizeLayerId, 'visibility', Visibility.None);
      },
      onMove: (event: MapMouseEvent) => {
        const pointA = this.map.project(selectedImage.position[currentIndex]);
        const pointB = this.map.project(selectedImage.position[selectedImage.getOppositePoint(currentIndex)]);
        const pointP = this.map.project(event.lngLat);
        const closestPoint = getClosestPoint([pointA.x, pointA.y], [pointB.x, pointB.y], [pointP.x, pointP.y]);
        const closestLngLat = this.map.unproject(closestPoint);
        const scaledPosition = selectedImage.position;

        scaledPosition[currentIndex] = new LngLat(closestLngLat.lng, closestLngLat.lat);

        if (currentIndex === 0) {
          scaledPosition[1] = new LngLat(scaledPosition[1].lng, closestLngLat.lat);
          scaledPosition[3] = new LngLat(closestLngLat.lng, scaledPosition[3].lat);
        } else if (currentIndex === 1) {
          scaledPosition[0] = new LngLat(scaledPosition[0].lng, closestLngLat.lat);
          scaledPosition[2] = new LngLat(closestLngLat.lng, scaledPosition[2].lat);
        } else if (currentIndex === 2) {
          scaledPosition[3] = new LngLat(scaledPosition[3].lng, closestLngLat.lat);
          scaledPosition[1] = new LngLat(closestLngLat.lng, scaledPosition[1].lat);
        } else if (currentIndex === 3) {
          scaledPosition[2] = new LngLat(scaledPosition[2].lng, closestLngLat.lat);
          scaledPosition[0] = new LngLat(closestLngLat.lng, scaledPosition[0].lat);
        }

        this.updateImageSource(scaledPosition);
      },
      onEnd: () => {
        currentIndex = null;
        this.map.setLayoutProperty(highlightLayerId, 'visibility', Visibility.Visible);
        this.map.setLayoutProperty(resizeLayerId, 'visibility', Visibility.Visible);
      },
      // customCursor: (event: MapLayerMouseEvent) => {
      //   const index = event.features[0].properties.index as number;
      //   return [1, 3].includes(index) ? Cursor.NESWResize : Cursor.NWSEResize;
      // },
    });

    this.map.addLayer(highlightLayer(this.selectedImage));
    this.map.addLayer(resizeLayer(this.selectedImage));

    this.modeResizingOff = () => {
      draggableLayerCleanup();
      this.map.removeLayer(resizeLayerId);
      this.map.removeLayer(highlightLayerId);
      this.mapCanvas.style.cursor = '';
    };
  }

  selectImage(id: string) {
    if (this.selectedImage && this.selectedImage.id !== id) this.deselectImage();
    this.selectedImage = this.images.find(i => i.id === id);
    if (!this.editMode) {
      this.editMode = EditMode.Move;
      this.modeMovingOn();
    } else if (this.editMode === EditMode.Move) {
      this.editMode = EditMode.Transform;
      this.modeMovingOff();
      this.moveResizingOn();
    }
  }

  deselectImage() {
    if (!this.selectedImage) return;
    if (this.editMode === EditMode.Move) {
      this.modeMovingOff();
    } else if (this.editMode === EditMode.Transform) {
      this.modeResizingOff();
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
    this.ifStyleLoaded(() => {
      this.insert();
    });
    this.mapContainer = this.map.getContainer();
    this.mapCanvas = this.map.getCanvas();
    this.map.on('click', this.onMapClick);
  }
}
