import en from '../srtings/en.js';

class Base {
  /**
   * @param {import('../types').BaseOptions=} options
   */
  constructor(options) {
    /** @type {import('mapbox-gl').Map} */
    this.map; // eslint-disable-line no-unused-expressions
    this.node = document.createElement('div');
    this.node.classList.add('mapboxgl-ctrl');
    this.node.classList.add('mapboxgl-ctrl-group');
    this.node.classList.add('mapbox-control');
    this.strings = options?.strings ?? en;
  }

  /**
   * @param {import('../types').ButtonOptions=} options
   * @returns {HTMLButtonElement}
   */
  static createButton(options = {}) {
    const button = document.createElement('button');
    button.type = 'button';

    if (options.icon) {
      button.appendChild(options.icon);
    }

    if (options.text) {
      button.textContent = options.text;
    }

    if (options.title) {
      button.title = options.title;
    }

    return button;
  }

  /**
   * @param {HTMLButtonElement} button
   */
  static activateButton(button) {
    button.classList.add('-active');
  }

  /**
   * @param {HTMLButtonElement} button
   */
  static deactivateButton(button) {
    button.classList.remove('-active');
  }

  /**
   * @param {HTMLButtonElement} button
   * @return {boolean}
   */
  static isActivateButton(button) {
    return button.classList.contains('-active');
  }

  /**
   * @param {HTMLButtonElement} button
   */
  addButton(button) {
    this.node.appendChild(button);
  }

  $onAdd() {
    // extend
  }

  $onRemove() {
    // extend
  }

  /**
   * @param {import('../types').Strings} json
   */
  setStrings(json) {
    this.strings = json;
  }

  /**
   * @param {import('mapbox-gl').Map} map
   * @return {HTMLDivElement}
   */
  onAdd(map) {
    this.map = map;
    this.$onAdd();

    return this.node;
  }

  onRemove() {
    this.$onRemove();
    if (!this.node.parentNode) return;
    this.node.parentNode.removeChild(this.node);
  }
}

export default Base;
