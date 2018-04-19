const addSVG = '<svg fill="#232323" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';

const removeSVG = '<svg fill="#232323" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M19 13H5v-2h14v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';

export default class {
  constructor(options = {}) {
    this.options = options;
  }

  insertControls() {
    this.container = document.createElement('div');
    this.container.classList.add('mapboxgl-ctrl');
    this.container.style.background = '#fff';
    this.container.style.boxShadow = '0 1px 4px rgba(0, 0, 0, .3)';
    this.container.style.borderRadius = '2px';
    this.container.classList.add('mapbox-ctrl-zoom');
    this.zoomIn = document.createElement('div');
    this.zoomOut = document.createElement('div');
    this.zoomIn.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
    this.zoomIn.style.background = `url('data:image/svg+xml,${addSVG}') center no-repeat`;
    this.zoomOut.style.background = `url('data:image/svg+xml,${removeSVG}') center no-repeat`;
    [this.zoomIn, this.zoomOut].forEach((node) => {
      node.style.width = '30px';
      node.style.height = '30px';
      node.style.cursor = 'pointer';
      this.container.appendChild(node);
    });
  }

  onAdd(map) {
    this.map = map;
    this.insertControls();
    this.zoomIn.addEventListener('click', () => { this.map.zoomIn(); });
    this.zoomOut.addEventListener('click', () => { this.map.zoomOut(); });
    return this.container;
  }

  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }
}
