import theme from './theme';
import { PlusIcon, MinusIcon } from './icons';

class Zoom {
  insertControls() {
    this.container = document.createElement('div');
    this.container.classList.add('mapboxgl-ctrl');
    this.container.style.background = theme.colorDefault;
    this.container.style.boxShadow = theme.boxShadow;
    this.container.style.borderRadius = theme.borderRadius;
    this.container.classList.add('mapbox-ctrl-zoom');
    this.zoomIn = document.createElement('div');
    this.zoomIn.style.borderBottom = theme.border;
    this.zoomIn.style.position = 'relative';
    this.zoomIn.innerHTML = PlusIcon;
    this.zoomOut = document.createElement('div');
    this.zoomOut.style.position = 'relative';
    this.zoomOut.innerHTML = MinusIcon;
    [this.zoomIn, this.zoomOut].forEach((node) => {
      node.style.width = theme.width;
      node.style.height = theme.height;
      node.style.cursor = 'pointer';
      this.container.appendChild(node);
    });
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
