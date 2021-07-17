import { LngLat, MapboxGeoJSONFeature, MapMouseEvent, PointLike } from 'mapbox-gl';
import Base from '../Base/Base';
import Button from '../Button/Button';
import popupTemplate from './popupTemplate';
import iconInspect from '../icons/inspect';

interface InspectControlOptions {
  /** Log inspected features to console */
  console?: boolean
}

export default class InspectControl extends Base {
  console: boolean
  popupNode: HTMLDivElement
  lngLat: LngLat
  isInspecting: boolean
  button: Button
  mapContainer: HTMLElement
  mapCanvas: HTMLCanvasElement

  constructor(options?: InspectControlOptions) {
    super();
    this.console = options?.console;
    this.popupNode = null;
    this.lngLat = null;
    this.isInspecting = false;
    this.button = new Button();
  }

  insert() {
    this.addClassName('mapbox-control-inspect');
    this.button.setIcon(iconInspect());
    this.button.onClick(() => {
      if (this.isInspecting) {
        this.inspectingOff();
      } else {
        this.inspectingOn();
      }
    });
    this.addButton(this.button);
    this.mapClickListener = this.mapClickListener.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }

  inspectingOn() {
    this.isInspecting = true;
    this.button.addClassName('-active');
    this.map.on('click', this.mapClickListener);
    this.map.on('move', this.updatePosition);
    this.map.getCanvas().style.cursor = 'pointer';
  }

  inspectingOff() {
    this.isInspecting = false;
    this.button.removeClassName('-active');
    this.map.off('click', this.mapClickListener);
    this.map.off('move', this.updatePosition);
    this.map.getCanvas().style.cursor = '';
    this.removePopup();
  }

  getFeatures(event: MapMouseEvent) {
    const selectThreshold = 3;
    const queryBox = [
      [event.point.x - selectThreshold, event.point.y + selectThreshold], // bottom left (SW)
      [event.point.x + selectThreshold, event.point.y - selectThreshold], // top right (NE)
    ] as [PointLike, PointLike];
    return this.map.queryRenderedFeatures(queryBox);
  }

  addPopup(features: MapboxGeoJSONFeature[]) {
    this.popupNode = popupTemplate(features);
    this.mapContainer.appendChild(this.popupNode);
    this.updatePosition();
    if (this.console) {
      console.log(features);
    }
  }

  removePopup() {
    if (!this.popupNode) return;
    this.mapContainer.removeChild(this.popupNode);
    this.popupNode = null;
  }

  updatePosition() {
    if (!this.lngLat) return;
    const canvasRect = this.mapCanvas.getBoundingClientRect();
    const pos = this.map.project(this.lngLat);
    this.popupNode.style.left = `${pos.x - canvasRect.left}px`;
    this.popupNode.style.top = `${pos.y - canvasRect.top}px`;
  }

  mapClickListener(event: MapMouseEvent) {
    this.lngLat = event.lngLat;
    const features = this.getFeatures(event);
    this.removePopup();
    this.addPopup(features);
  }

  onAddControl() {
    this.mapContainer = this.map.getContainer();
    this.mapCanvas = this.map.getCanvas();
    this.insert();
  }

  onRemoveControl() {
    this.inspectingOff();
  }
}
