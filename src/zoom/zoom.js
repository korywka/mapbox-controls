import iconPlus from './icon-plus.svg';
import iconMinus from './icon-minus.svg';

/**
 * Simple zoom control
 */
export default class ZoomControl {
  insertControls() {
    this.container = document.createElement('div');
    this.container.classList.add('mapboxgl-ctrl');
    this.container.classList.add('mapboxgl-ctrl-group');
    this.container.classList.add('mapboxgl-ctrl-zoom');
    this.zoomIn = document.createElement('button');
    this.zoomIn.setAttribute('type', 'button');
    this.zoomIn.appendChild(iconPlus());
    this.zoomOut = document.createElement('button');
    this.zoomOut.setAttribute('type', 'button');
    this.zoomOut.appendChild(iconMinus());
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
