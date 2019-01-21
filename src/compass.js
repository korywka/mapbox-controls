class Compass {
  constructor() {
    this.toggle = this.toggle.bind(this);
  }

  insertControls() {
    this.container = document.createElement('div');
    this.compassButton = document.createElement('button');
    this.icon = document.createElement('span');
    this.container.classList.add('mapboxgl-ctrl');
    this.container.classList.add('mapboxgl-ctrl-group');
    this.container.classList.add('mapboxgl-ctrl-bearing');
    this.container.appendChild(this.compassButton);
    this.compassButton.appendChild(this.icon);
  }

  onAdd(map) {
    this.map = map;
    this.insertControls();
    this.container.addEventListener('click', () => {
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
    if (angle === 0) {
      this.container.classList.remove('-active');
    } else {
      this.container.classList.add('-active');
    }
    this.icon.style.transform = `rotate(${angle}deg)`;
  }
}

export default Compass;
