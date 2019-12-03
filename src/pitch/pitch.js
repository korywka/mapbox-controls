import icon3D from './icon-3d.svg';

class Pitch {
  constructor() {
    this.onClick = this.onClick.bind(this);
  }

  insertControls() {
    this.container = document.createElement('div');
    this.button = document.createElement('button');
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
    if (this.map.getPitch() > 30) {
      this.map.easeTo({ bearing: 0, pitch: 0, duration: 600 });
    } else {
      this.map.easeTo({ bearing: -40, pitch: 60, duration: 600 });
    }
  }

  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }
}

export default Pitch;
