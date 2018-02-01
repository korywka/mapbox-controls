const compassSVG = '<svg width="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"/><path fill="#212121" d="M12 3l4 8H8z"/><path fill="#9E9E9E" d="M12 21l-4-8h8z"/></g></svg>';

export default class {
  constructor(options = {}) {
    this.options = options;
    this.toggle = this.toggle.bind(this);
  }

  insertControls() {
    this.container = document.createElement('div');
    this.compassButton = document.createElement('div');
    this.container.classList.add('mapboxgl-ctrl');
    this.container.style.background = '#fff';
    this.container.style.boxShadow = '0 1px 4px rgba(0, 0, 0, .3)';
    this.container.style.borderRadius = '2px';
    this.container.style.overflow = 'hidden';
    this.container.style.opacity = '0';
    this.container.style.transition = '.2s opacity ease-in-out';
    this.container.classList.add('mapbox-ctrl-compass');
    this.compassButton.style.position = 'relative';
    this.compassButton.style.background = `url('data:image/svg+xml,${compassSVG}') center no-repeat`;
    this.compassButton.style.width = '28px';
    this.compassButton.style.height = '28px';
    this.compassButton.style.cursor = 'pointer';
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
