import iconCCW from './icon-ccw.svg';
import iconCW from './icon-cw.svg';
import iconPointer from './icon-pointer.svg';

/**
 * @param {Object} options
 * @param {Boolean} [options.instant=true] - Show compass if bearing is 0
 */

class Compass {
  constructor(options = {}) {
    this.instant = typeof options.instant === 'boolean' ? options.instant : true;
    this.toggle = this.toggle.bind(this);
  }

  insertControls() {
    this.container = document.createElement('div');
    this.compassButton = document.createElement('button');
    this.container.classList.add('mapboxgl-ctrl');
    this.container.classList.add('mapboxgl-ctrl-group');
    this.container.classList.add('mapboxgl-ctrl-compass');
    this.pointer = iconPointer({ class: 'mapboxgl-ctrl-compass-pointer' });
    this.arrowCW = iconCW({ class: 'mapboxgl-ctrl-compass-cw' });
    this.arrowCCW = iconCCW({ class: 'mapboxgl-ctrl-compass-ccw' });
    if (this.instant) {
      this.container.classList.add('-active');
    }
    this.container.appendChild(this.compassButton);
    this.compassButton.appendChild(this.pointer);
    this.compassButton.appendChild(this.arrowCW);
    this.compassButton.appendChild(this.arrowCCW);
  }

  onAdd(map) {
    this.map = map;
    this.insertControls();
    this.compassButton.addEventListener('click', () => {
      this.map.easeTo({
        pitch: 0,
        bearing: 0,
      });
    });
    this.arrowCW.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!this.map.isRotating()) {
        this.map.easeTo({
          bearing: this.map.getBearing() - 45,
        });
      }
    });
    this.arrowCCW.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!this.map.isRotating()) {
        this.map.easeTo({
          bearing: this.map.getBearing() + 45,
        });
      }
    });
    this.map.on('rotate', this.toggle);
    this.toggle();
    return this.container;
  }

  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }

  toggle() {
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

export default Compass;
