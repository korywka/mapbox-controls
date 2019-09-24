import iconInspect from './icon-inspect.svg';


class Zoom {
  insertControls() {
    this.container = document.createElement('div');
    this.container.classList.add('mapboxgl-ctrl');
    this.container.classList.add('mapboxgl-ctrl-group');
    this.container.classList.add('mapboxgl-ctrl-inspect');
    this.button = document.createElement('button');
    this.button.appendChild(iconInspect());
    this.container.appendChild(this.button);
  }

  onAdd(map) {
    this.map = map;
    this.isInspecting = false;
    this.insertControls();
    this.button.addEventListener('click', () => {
      if (this.isInspecting) {
        this.inspectingOff();
      } else {
        this.inspectingOn();
      }
    });
    return this.container;
  }

  inspectingOn() {
    this.isInspecting = true;
    this.button.classList.add('-active');
  }

  inspectingOff() {
    this.isInspecting = false;
    this.button.classList.remove('-active');
  }

  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }
}

export default Zoom;
