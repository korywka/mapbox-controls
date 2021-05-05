import { LngLat, MapLayerEventType, MapMouseEvent } from 'mapbox-gl';
import Base from '../Base/Base';

interface TooltipControlOptions {
  /** Triggered each time mouse moved over `layer` option. */
  getContent: (event: MapMouseEvent) => string;
  /** Layer id to show the tooltip on hover. If not specified, tooltip will be shown for whole map container */
  layer?: string;
}

export default class TooltipControl extends Base {
  layer: string
  getContent: (event: MapMouseEvent) => string
  container: HTMLDivElement
  eventShow: keyof MapLayerEventType
  eventHide: keyof MapLayerEventType
  lngLat: LngLat
  cursorStyle: string
  mapContainer: HTMLElement
  mapCanvas: HTMLCanvasElement

  constructor(options: TooltipControlOptions) {
    super();
    if (typeof options?.getContent !== 'function') {
      throw Error('getContent function must be defined');
    }
    this.layer = options?.layer;
    this.getContent = options?.getContent;
    this.container = document.createElement('div');
    this.eventShow = this.layer ? 'mouseenter' : 'mouseover';
    this.eventHide = this.layer ? 'mouseleave' : 'mouseout';
    this.node = document.createElement('div');
    this.node.classList.add('mapbox-control-tooltip');
    this.lngLat = null;
    this.cursorStyle = '';
    this.show = this.show.bind(this);
    this.move = this.move.bind(this);
    this.hide = this.hide.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }

  show() {
    this.mapContainer.appendChild(this.node);
    this.cursorStyle = this.mapCanvas.style.cursor;
    this.mapCanvas.style.cursor = 'pointer';
    this.map.on('move', this.updatePosition);
  }

  hide() {
    this.node.innerHTML = '';
    this.mapContainer.removeChild(this.node);
    this.mapCanvas.style.cursor = this.cursorStyle;
    this.map.off('move', this.updatePosition);
  }

  move(event) {
    this.node.innerHTML = this.getContent(event);
    this.lngLat = event.lngLat;
    this.updatePosition();
  }

  updatePosition() {
    if (!this.lngLat) return;
    const pos = this.map.project(this.lngLat);
    this.node.style.left = `${pos.x}px`;
    this.node.style.top = `${pos.y}px`;
  }

  onAddControl() {
    this.mapContainer = this.map.getContainer();
    this.mapCanvas = this.map.getCanvas();
    if (this.layer) {
      this.map.on(this.eventShow, this.layer, this.show);
      this.map.on('mousemove', this.layer, this.move);
      this.map.on(this.eventHide, this.layer, this.hide);
    } else {
      this.map.on(this.eventShow, this.show);
      this.map.on('mousemove', this.move);
      this.map.on(this.eventHide, this.hide);
    }
  }

  onRemoveControl() {
    if (this.layer) {
      this.map.off(this.eventShow, this.layer, this.show);
      this.map.off('mousemove', this.layer, this.move);
      this.map.off(this.eventHide, this.layer, this.hide);
    } else {
      this.map.off(this.eventShow, this.show);
      this.map.off('mousemove', this.move);
      this.map.off(this.eventHide, this.hide);
    }
    this.hide();
  }
}
