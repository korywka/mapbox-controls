import iconPointer from './icon-pointer.svg';

/**
 * Simple compass
 * @param {Object} options
 * @param {Boolean} [options.instant=true] - Show compass if bearing is 0
 */

export default class CompassControl {
  constructor(options = {}) {
    this.instant = typeof options.instant === 'boolean' ? options.instant : true;
    this.onRotate = this.onRotate.bind(this);
  }

  insertControls() {
    this.container = document.createElement('div');
    this.button = document.createElement('button');
    this.button.setAttribute('type', 'button');
    this.container.classList.add('mapboxgl-ctrl');
    this.container.classList.add('mapboxgl-ctrl-group');
    this.container.classList.add('mapboxgl-ctrl-compass');
    this.pointer = iconPointer();
    if (this.instant) {
      this.container.classList.add('-active');
    }
    this.container.appendChild(this.button);
    this.button.appendChild(this.pointer);
  }

  onAdd(map) {
    this.map = map;
    this.insertControls();
    this.button.addEventListener('click', () => {
      this.map.easeTo({ bearing: 0, pitch: 0 });
    });
    this.map.on('rotate', this.onRotate);
    this.onRotate();
    return this.container;
  }

  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }

  onRotate() {
    const angle = this.map.getBearing() * (-1);
    if (!this.instant) {
      if (angle === 0) {
        this.container.classList.remove('-active');
      } else {
        this.container.classList.add('-active');
      }
    }
    this.pointer.style.transform = `rotate(${angle}deg)`;
  }
}