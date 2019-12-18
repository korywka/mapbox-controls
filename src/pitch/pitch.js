import icon3D from './icon-3d.svg';

/**
 * @param {Object} options
 * @param {Number} [options.zoom] - Zoom to while pitch
 */

class Pitch {
  constructor(options = {}) {
    this.zoom = options.zoom;
    this.onClick = this.onClick.bind(this);
  }

  insertControls() {
    this.container = document.createElement('div');
    this.button = document.createElement('button');
    this.button.setAttribute('type', 'button');
    this.container.classList.add('mapboxgl-ctrl');
    this.container.classList.add('mapboxgl-ctrl-group');
    this.container.classList.add('mapboxgl-ctrl-pitch');
    this.button.appendChild(icon3D());
    this.container.appendChild(this.button);
  }

  onAdd(map) {
    this.map = map;
    this.insertControls();
    this.button.addEventListener('click', this.onClick);
    this.map.on('pitchend', () => {
      if (this.map.getPitch() > 30) {
        this.container.classList.add('-active');
      } else {
        this.container.classList.remove('-active');
      }
    });
    return this.container;
  }

  onClick() {
    const duration = 600;
    const on = { bearing: -40, pitch: 60, duration };
    const off = { bearing: 0, pitch: 0, duration };

    if (this.zoom && this.zoom > this.map.getZoom()) {
      on.zoom = this.zoom;
    }

    if (this.map.getPitch() > 30) {
      this.map.easeTo(off);
    } else {
      this.map.easeTo(on);
    }
  }

  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }
}

export default Pitch;
