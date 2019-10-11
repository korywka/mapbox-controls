const defaultGetContent = (event) => {
  const coords = event.lngLat;
  return `LngLat: ${coords.lng.toFixed(6)}, ${coords.lat.toFixed(6)}`;
};

/**
 * Shows tooltip on hover
 * @param {Object} options
 * @param {String} options.layer - Layer id to show the tooltip on hover.
 * If not specified, tooltip will be shown for whole map container
 * @param {Function} [options.getContent] - Triggered each time mouse moved over `layer` option.
 * Accepts `event` object
 */

class Tooltip {
  constructor(options = {}) {
    this.layer = options.layer;
    this.getContent = options.getContent || defaultGetContent;
    this.container = document.createElement('div');
    this.eventShow = this.layer ? 'mouseenter' : 'mouseover';
    this.eventHide = this.layer ? 'mouseleave' : 'mouseout';
    this.node = document.createElement('div');
    this.node.classList.add('mapboxgl-ctrl-tooltip');
    this.lngLat = null;
    this.show = this.show.bind(this);
    this.move = this.move.bind(this);
    this.hide = this.hide.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }

  show() {
    this.mapContainer.appendChild(this.node);
    this.map.getCanvas().style.cursor = 'pointer';
    this.map.on('move', this.updatePosition);
  }

  hide() {
    this.node.innerHTML = '';
    this.mapContainer.removeChild(this.node);
    this.map.getCanvas().style.cursor = '';
    this.map.off('move', this.updatePosition);
  }

  move(event) {
    this.node.innerHTML = this.getContent(event);
    this.lngLat = event.lngLat;
    this.updatePosition();
  }

  updatePosition() {
    if (!this.lngLat) return;
    const canvasRect = this.canvas.getBoundingClientRect();
    const pos = this.map.project(this.lngLat);
    this.node.style.left = `${pos.x - canvasRect.left}px`;
    this.node.style.top = `${pos.y - canvasRect.top}px`;
  }

  onAdd(map) {
    this.map = map;
    this.mapContainer = this.map.getContainer();
    this.canvas = this.map.getCanvas();
    if (this.layer) {
      this.map.on(this.eventShow, this.layer, this.show);
      this.map.on(this.eventHide, this.layer, this.hide);
    } else {
      this.map.on(this.eventShow, this.show);
      this.map.on(this.eventHide, this.hide);
    }
    this.map.on('mousemove', this.move);
    return this.container;
  }

  onRemove() {
    if (this.layer) {
      this.map.off(this.eventShow, this.layer, this.show);
      this.map.off(this.eventHide, this.layer, this.hide);
    } else {
      this.map.off(this.eventShow, this.show);
      this.map.off(this.eventHide, this.hide);
    }
    this.map.off('mousemove', this.move);
    this.hide();
    this.map = undefined;
  }
}

export default Tooltip;
