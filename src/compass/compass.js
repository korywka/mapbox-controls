import iconCCW from './icon-ccw';
import iconCW from './icon-cw';
import iconPointer from './icon-pointer';

/**
 * @param {object} options
 * @param {boolean} [options.instant=true] - Show compass if bearing is 0
 */

class Compass {
  constructor(options = {}) {
    this.instant = typeof options.instant === 'boolean' ? options.instant : true;
    this.nodeCCW = (new DOMParser().parseFromString(iconCCW, 'text/xml')).firstChild;
    this.nodeCW = (new DOMParser().parseFromString(iconCW, 'text/xml')).firstChild;
    this.nodePointer = (new DOMParser().parseFromString(iconPointer, 'text/xml')).firstChild;
    this.toggle = this.toggle.bind(this);
  }

  insertControls() {
    this.container = document.createElement('div');
    this.compassButton = document.createElement('button');
    this.pointer = this.nodePointer;
    this.pointer.classList.add('mapboxgl-ctrl-compass-pointer');
    this.arrowCCW = this.nodeCCW;
    this.arrowCCW.classList.add('mapboxgl-ctrl-compass-ccw');
    this.arrowCW = this.nodeCW;
    this.arrowCW.classList.add('mapboxgl-ctrl-compass-cw');
    this.container.classList.add('mapboxgl-ctrl');
    this.container.classList.add('mapboxgl-ctrl-group');
    this.container.classList.add('mapboxgl-ctrl-compass');
    if (this.instant) {
      this.container.classList.add('-active');
    }
    this.container.appendChild(this.compassButton);
    this.compassButton.appendChild(this.pointer);
    this.compassButton.appendChild(this.arrowCCW);
    this.compassButton.appendChild(this.arrowCW);
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
