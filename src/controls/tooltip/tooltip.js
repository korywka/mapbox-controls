import Base from '../../base/base.js';

export default class Tooltip extends Base {
  /**
   * @param {import('../../types').Tooltip.Options=} options
   */
  constructor(options) {
    super();
    if (typeof options?.getContent !== 'function') {
      throw Error('getContent function must be defined');
    }
    this.layer = options?.layer;
    this.getContent = options?.getContent;
    this.container = document.createElement('div');
    /** @type {keyof import('mapbox-gl').MapLayerEventType} */
    this.eventShow = this.layer ? 'mouseenter' : 'mouseover';
    /** @type {keyof import('mapbox-gl').MapLayerEventType} */
    this.eventHide = this.layer ? 'mouseleave' : 'mouseout';
    this.node = document.createElement('div');
    this.node.classList.add('mapbox-control-tooltip');
    this.lngLat = undefined;
    this.cursorStyle = '';
    this.show = this.show.bind(this);
    this.move = this.move.bind(this);
    this.hide = this.hide.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }

  show() {
    this.map.getContainer().appendChild(this.node);
    this.cursorStyle = this.map.getCanvas().style.cursor;
    this.map.getCanvas().style.cursor = 'pointer';
    this.map.on('move', this.updatePosition);
  }

  hide() {
    this.node.innerHTML = '';
    this.map.getContainer().removeChild(this.node);
    this.map.getCanvas().style.cursor = this.cursorStyle;
    this.map.off('move', this.updatePosition);
  }

  /**
   * @param {import('mapbox-gl').MapMouseEvent} event
   */
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
