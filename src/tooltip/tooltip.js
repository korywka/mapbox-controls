const defaultGetContent = (event) => {
  const coords = event.lngLat;
  return `LngLat: ${coords.lng.toFixed(6)}, ${coords.lat.toFixed(6)}`;
};

const mouseMoveEvent = 'mousemove';
const mapMoveEvent = 'move';

/**
 * Shows tooltip on hover on some layer or whole map.
 * @param {Object} options
 * @param {String} options.layer - Layer id to show the tooltip on hover.
 * If not specified, tooltip will be shown for whole map container
 * @param {Function} [options.getContent] - Triggered each time mouse moved over `layer` option.
 * Accepts `event` object
 */

export default class TooltipControl {
  constructor(options = {}) {
    this.layer = options.layer;
    this.getContent = options.getContent || defaultGetContent;
    this.container = document.createElement('div');
    this.eventShow = this.layer ? 'mouseenter' : 'mouseover';
    this.eventHide = this.layer ? 'mouseleave' : 'mouseout';
    this.node = document.createElement('div');
    this.node.classList.add('mapboxgl-ctrl-tooltip');
    this.lngLat = null;
    this.cursorStyle = '';
    this.show = this.show.bind(this);
    this.move = this.move.bind(this);
    this.hide = this.hide.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }

  show() {
    this.mapContainer.appendChild(this.node);
    this.cursorStyle = this.canvas.style.cursor;
    this.canvas.style.cursor = 'pointer';
    this.map.on(mapMoveEvent, this.updatePosition);
  }

  hide() {
    this.node.innerHTML = '';
    this.mapContainer.removeChild(this.node);
    this.canvas.style.cursor = this.cursorStyle;
    this.map.off(mapMoveEvent, this.updatePosition);
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

  onAdd(map) {
    this.map = map;
    this.mapContainer = this.map.getContainer();
    this.canvas = this.map.getCanvas();
    if (this.layer) {
      this.map.on(this.eventShow, this.layer, this.show);
      this.map.on(mouseMoveEvent, this.layer, this.move);
      this.map.on(this.eventHide, this.layer, this.hide);
    } else {
      this.map.on(this.eventShow, this.show);
      this.map.on(mouseMoveEvent, this.move);
      this.map.on(this.eventHide, this.hide);
    }
    return this.container;
  }

  onRemove() {
    if (this.layer) {
      this.map.off(this.eventShow, this.layer, this.show);
      this.map.off(mouseMoveEvent, this.layer, this.move);
      this.map.off(this.eventHide, this.layer, this.hide);
    } else {
      this.map.off(this.eventShow, this.show);
      this.map.off(mouseMoveEvent, this.move);
      this.map.off(this.eventHide, this.hide);
    }
    this.hide();
    this.map = undefined;
  }
}
