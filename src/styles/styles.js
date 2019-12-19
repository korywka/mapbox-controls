const defaultStyles = [
  {
    label: 'Streets',
    styleName: 'Mapbox Streets',
    styleUrl: 'mapbox://styles/mapbox/streets-v11',
  }, {
    label: 'Satellite',
    styleName: 'Mapbox Satellite Streets',
    styleUrl: 'mapbox://sprites/mapbox/satellite-streets-v11',
  },
];

/**
 * Adds style switcher similar to Google Maps.
 * @param {Object} options
 * @param {Array} [options.styles] - Array of style objects:
 * @param {String} options.styles.label - Style label to display on switcher
 * @param {String} options.styles.styleName - [Style name from spec](https://docs.mapbox.com/mapbox-gl-js/style-spec/#root-name)
 * @param {String} options.styles.styleUrl - Style url
 * @param {Function} [options.onChange] - Triggered on style change. Accepts `style` object
 */

export default class StylesControl {
  constructor(options = {}) {
    this.styles = options.styles || defaultStyles;
    this.onChange = options.onChange;
  }

  insertControls() {
    this.container = document.createElement('div');
    this.container.classList.add('mapboxgl-ctrl');
    this.container.classList.add('mapboxgl-ctrl-group');
    this.container.classList.add('mapboxgl-ctrl-styles');
    this.nodes = [];
    this.styles.forEach((style) => {
      const node = document.createElement('button');
      node.setAttribute('type', 'button');
      node.textContent = style.label;
      node.addEventListener('click', () => {
        if (node.classList.contains('-active')) return;
        this.map.setStyle(style.styleUrl);
        if (this.onChange) this.onChange(style);
      });
      this.nodes.push(node);
      this.container.appendChild(node);
    });
  }

  onAdd(map) {
    this.map = map;
    this.insertControls();
    this.map.on('styledata', () => {
      [].forEach.call(this.container.querySelectorAll('button'), (div) => {
        div.classList.remove('-active');
      });
      const styleNames = this.styles.map((style) => style.styleName);
      const currentStyleIndex = styleNames.indexOf(this.map.getStyle().name);
      if (currentStyleIndex !== -1) {
        const currentNode = this.nodes[currentStyleIndex];
        currentNode.classList.add('-active');
      }
    });
    return this.container;
  }

  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }
}
