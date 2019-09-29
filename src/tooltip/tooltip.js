const defaultGetContent = (event) => {
  const coords = event.lngLat;
  return `LngLat: ${coords.lng.toFixed(6)}, ${coords.lat.toFixed(6)}`;
};

class Tooltip {
  constructor(options = {}) {
    this.layers = options.layers;
    this.getContent = options.getContent || defaultGetContent;
    this.container = document.createElement('div');
    this.eventShow = this.layers ? 'mouseenter' : 'mouseover';
    this.eventMove = 'mousemove';
    this.eventHide = this.layers ? 'mouseleave' : 'mouseout';
    this.node = document.createElement('div');
    this.node.classList.add('mapboxgl-ctrl-tooltip');
    this.show = this.show.bind(this);
    this.move = this.move.bind(this);
    this.hide = this.hide.bind(this);
  }

  show() {
    this.mapContainer.appendChild(this.node);
    this.map.getCanvas().style.cursor = 'pointer';
  }

  move(event) {
    const canvasRect = this.canvas.getBoundingClientRect();
    this.node.innerHTML = this.getContent(event);
    this.node.style.left = `${event.originalEvent.clientX - canvasRect.left}px`;
    this.node.style.top = `${event.originalEvent.clientY - canvasRect.top}px`;
  }

  hide() {
    this.node.innerHTML = '';
    this.mapContainer.removeChild(this.node);
    this.map.getCanvas().style.cursor = '';
  }

  onAdd(map) {
    this.map = map;
    this.mapContainer = this.map.getContainer();
    this.canvas = this.map.getCanvas();
    if (this.layers) {
      this.map.on(this.eventShow, this.layers, this.show);
      this.map.on(this.eventHide, this.layers, this.hide);
    } else {
      this.map.on(this.eventShow, this.show);
      this.map.on(this.eventHide, this.hide);
    }
    this.map.on(this.eventMove, this.move);
    return this.container;
  }

  onRemove() {
    if (this.layers) {
      this.map.off(this.eventShow, this.layers, this.show);
      this.map.off(this.eventHide, this.layers, this.hide);
    } else {
      this.map.off(this.eventShow, this.show);
      this.map.off(this.eventHide, this.hide);
    }
    this.map.off(this.eventMove, this.move);
    this.hide();
    this.map = undefined;
  }
}

export default Tooltip;
