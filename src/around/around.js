import icon3D from './icon-3d.svg';

/**
 * Set pitch to 60 and rotate a little camera with easing.
 * @param {Object} options
 * @param {Number} [options.minZoom] - Minimal zoom while rotation
 * @param {Array} [options.center] - Fly to center while rotation
 */

export default class AroundControl {
  constructor(options = {}) {
    this.minZoom = options.minZoom;
    this.center = options.center;
    this.onClick = this.onClick.bind(this);
    this.isActive = false;
    this.beforeZoom = null;
    this.beforeCenter = null;
  }

  insertControls() {
    this.container = document.createElement('div');
    this.button = document.createElement('button');
    this.button.setAttribute('type', 'button');
    this.container.classList.add('mapboxgl-ctrl');
    this.container.classList.add('mapboxgl-ctrl-group');
    this.container.classList.add('mapboxgl-ctrl-around');
    this.button.appendChild(icon3D());
    this.container.appendChild(this.button);
  }

  onAdd(map) {
    this.map = map;
    this.insertControls();
    this.button.addEventListener('click', this.onClick);
    return this.container;
  }

  onClick() {
    this.isActive = !this.isActive;
    const duration = 600;
    let options = { duration };
    if (this.minZoom) {
      options.zoom = this.minZoom;
    }

    if (this.isActive) {
      this.beforeZoom = this.map.getZoom();
      this.beforeCenter = this.map.getCenter();
      this.container.classList.add('-active');
      options = Object.assign(options, {
        bearing: -40,
        pitch: 60,
        center: this.center,
      });
    } else {
      options = Object.assign(options, {
        bearing: 0, pitch: 0,
      });
      options.zoom = this.beforeZoom;
      options.center = this.beforeCenter;
      this.beforeZoom = null;
      this.beforeCenter = null;
      this.container.classList.remove('-active');
    }

    this.map.easeTo(options);
  }

  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
    this.isActive = false;
    this.beforeZoom = null;
    this.beforeCenter = null;
  }
}
