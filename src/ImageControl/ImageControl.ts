import { GeoJSONSource, ImageSource, LngLat, MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';
import Base from '../Base/Base';
import Button from '../Button/Button';
import iconImage from '../icons/image';
import { highlightLayer, highlightLayerId, resizeLayer, resizeLayerId } from './controlLayers';
import draggableLayer from './draggableLayer';
import { EditMode, Cursor } from './types';
import IImage from './IImage';

export default class ImageControl extends Base {
  button: Button
  mapCanvas: HTMLCanvasElement
  mapContainer: HTMLElement
  fileInput: HTMLInputElement
  images: IImage[]
  editMode?: EditMode
  selectedImage?: IImage
  disableMoving?: () => void
  disableResizing?: () => void

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
    this.map.addSource(image.polygonSource.id, image.polygonSource.source);
    this.map.addSource(image.pointsSource.id, image.pointsSource.source);
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

  enableMoving() {
    let startPosition: LngLat = null;
    const selectedImage = this.selectedImage;
    const eventCaptureLayerId = selectedImage.eventCaptureLayer.id;
    const dragCleanup = draggableLayer(this.map, eventCaptureLayerId, {
      onStart: (event: MapLayerMouseEvent) => {
        startPosition = event.lngLat;
        this.map.removeLayer(highlightLayerId);
      },
      onMove: (event: MapMouseEvent) => {
        const currentPosition = event.lngLat;
        const deltaLng = startPosition.lng - currentPosition.lng;
        const deltaLat = startPosition.lat - currentPosition.lat;
        selectedImage.position = selectedImage.position.map(coords => [coords[0] - deltaLng, coords[1] - deltaLat]);
        this.updateSource();
        startPosition = currentPosition;
      },
      onEnd: () => {
        this.map.addLayer(highlightLayer(this.selectedImage));
      },
    });

    this.mapCanvas.style.cursor = Cursor.Move;
    this.map.addLayer(highlightLayer(this.selectedImage));

    this.disableMoving = () => {
      dragCleanup();
      this.map.removeLayer(highlightLayerId);
    };
  }

  enableResizing() {
    let currentIndex;
    const selectedImage = this.selectedImage;
    const dragCleanup = draggableLayer(this.map, resizeLayerId, {
      onStart: (event: MapLayerMouseEvent) => {
        currentIndex = event.features[0].properties.index as number;
        this.map.removeLayer(highlightLayerId);
        this.map.removeLayer(resizeLayerId);
      },
      onMove: (event: MapMouseEvent) => {
        const currentPosition = event.lngLat;
        selectedImage.position[currentIndex] = [currentPosition.lng, currentPosition.lat];
        if (currentIndex === 0) {
          selectedImage.position[1] = [selectedImage.position[1][0], currentPosition.lat];
          selectedImage.position[3] = [currentPosition.lng, selectedImage.position[3][1]];
        } else if (currentIndex === 1) {
          selectedImage.position[0] = [selectedImage.position[0][0], currentPosition.lat];
          selectedImage.position[2] = [currentPosition.lng, selectedImage.position[2][1]];
        } else if (currentIndex === 2) {
          selectedImage.position[1] = [currentPosition.lng, selectedImage.position[1][1]];
          selectedImage.position[3] = [selectedImage.position[3][0], currentPosition.lat];
        } else if (currentIndex === 3) {
          selectedImage.position[2] = [selectedImage.position[2][0], currentPosition.lat];
          selectedImage.position[0] = [currentPosition.lng, selectedImage.position[0][1]];
        }
        this.updateSource();
      },
      onEnd: () => {
        currentIndex = null;
        this.map.addLayer(highlightLayer(this.selectedImage));
        this.map.addLayer(resizeLayer(this.selectedImage));
      },
      getHoverCursor: (event: MapLayerMouseEvent) => {
        const index = event.features[0].properties.index as number;
        return [1, 3].includes(index) ? Cursor.NESWResize : Cursor.NWSEResize;
      },
    });

    this.map.addLayer(highlightLayer(this.selectedImage));
    this.map.addLayer(resizeLayer(this.selectedImage));

    this.disableResizing = () => {
      dragCleanup();
      this.map.removeLayer(resizeLayerId);
      this.map.removeLayer(highlightLayerId);
    };
  }

  selectImage(id: string) {
    if (this.selectedImage && this.selectedImage.id !== id) this.deselectImage();
    this.selectedImage = this.images.find(i => i.id === id);
    if (!this.editMode) {
      this.editMode = EditMode.Move;
      this.enableMoving();
    } else if (this.editMode === EditMode.Move) {
      this.editMode = EditMode.Transform;
      this.disableMoving();
      this.enableResizing();
    }
  }

  deselectImage() {
    if (!this.selectedImage) return;
    if (this.editMode === EditMode.Move) {
      this.disableMoving();
    } else if (this.editMode === EditMode.Transform) {
      this.disableResizing();
    }
    this.selectedImage = null;
    this.editMode = null;
  }

  updateSource() {
    const selectedImage = this.selectedImage;
    (this.map.getSource(selectedImage.imageSource.id) as ImageSource).setCoordinates(selectedImage.position);
    (this.map.getSource(selectedImage.polygonSource.id) as GeoJSONSource).setData(selectedImage.asPolygon);
    (this.map.getSource(selectedImage.pointsSource.id) as GeoJSONSource).setData(selectedImage.asPoints);
  }

  onAddControl() {
    this.insert();
    this.mapContainer = this.map.getContainer();
    this.mapCanvas = this.map.getCanvas();
    this.map.on('click', this.onMapClick);
  }
}
