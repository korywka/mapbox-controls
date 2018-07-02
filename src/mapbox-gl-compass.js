import theme from './theme';
import { CompassIcon } from './icons';

export default class {
  constructor(options = {}) {
    this.options = options;
    this.toggle = this.toggle.bind(this);
  }

  insertControls() {
    this.container = document.createElement('div');
    this.compassButton = document.createElement('div');
    this.container.classList.add('mapboxgl-ctrl');
    this.container.style.background = theme.colorDefault;
    this.container.style.boxShadow = theme.boxShadow;
    this.container.style.borderRadius = theme.borderRadius;
    this.container.style.overflow = 'hidden';
    this.container.style.opacity = '0';
    this.container.style.transition = theme.transition;
    this.container.classList.add('mapbox-ctrl-compass');
    this.compassButton.style.position = 'relative';
    this.compassButton.style.width = theme.width;
    this.compassButton.style.height = theme.height;
    this.compassButton.style.cursor = 'pointer';
    this.compassButton.innerHTML = CompassIcon;
    this.container.appendChild(this.compassButton);
  }

  onAdd(map) {
    this.map = map;
    this.insertControls();
    this.compassButton.addEventListener('click', () => {
      this.map.resetNorth();
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
    this.container.style.opacity = angle === 0 ? '0' : '1';
    this.compassButton.style.transform = `rotate(${angle}deg)`;
  }
}
