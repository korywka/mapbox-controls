class Zoom {
  insertControls() {
    this.container = document.createElement('div');
    this.container.classList.add('mapboxgl-ctrl');
    this.container.classList.add('mapboxgl-ctrl-group');
    this.container.classList.add('mapboxgl-ctrl-zoom');
    this.zoomIn = document.createElement('button');
    this.zoomOut = document.createElement('button');
    this.container.appendChild(this.zoomIn);
    this.container.appendChild(this.zoomOut);
  }

  onAdd(map) {
    this.map = map;
    this.insertControls();
    this.zoomIn.addEventListener('click', () => {
      this.map.zoomIn();
    });
    this.zoomOut.addEventListener('click', () => {
      this.map.zoomOut();
    });
    return this.container;
  }

  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }
}

export default Zoom;
