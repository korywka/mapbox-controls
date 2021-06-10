import { Map } from 'mapbox-gl';
import Button from '../Button/Button';

class Base {
  node: HTMLDivElement;
  map: Map

  constructor() {
    this.node = document.createElement('div');
    this.node.classList.add('mapboxgl-ctrl');
    this.node.classList.add('mapboxgl-ctrl-group');
    this.node.classList.add('mapbox-control');
  }

  addButton(button: Button) {
    this.node.appendChild(button.node);
  }

  addClassName(className: string) {
    this.node.classList.add(className);
  }

  removeClassName(className: string) {
    this.node.classList.remove(className);
  }

  onAddControl() {
    // extend
  }

  onRemoveControl() {
    // extend
  }

  onAdd(map: Map) {
    this.map = map;
    this.onAddControl();
    return this.node;
  }

  onRemove() {
    this.onRemoveControl();
    this.node.parentNode.removeChild(this.node);
    this.map = undefined;
  }
}

export default Base;
