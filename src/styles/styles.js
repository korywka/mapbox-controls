const stylesDefault = [
  {
    label: 'Streets',
    styleName: 'Mapbox Streets',
    styleUrl: 'mapbox://styles/mapbox/streets-v9',
  }, {
    label: 'Satellite',
    styleName: 'Satellite',
    styleUrl: 'mapbox://styles/mapbox/satellite-v9',
  },
];

class Styles {
  constructor(styles) {
    this.styles = styles || stylesDefault;
  }

  insertControls() {
    this.container = document.createElement('div');
    this.container.classList.add('mapboxgl-ctrl');
    this.container.classList.add('mapboxgl-ctrl-group');
    this.container.classList.add('mapboxgl-ctrl-styles');
    this.nodes = [];
    this.styles.forEach((style) => {
      const node = document.createElement('button');
      node.textContent = style.label;
      node.addEventListener('click', () => {
        if (node.classList.contains('-active')) return;
        this.map.setStyle(style.styleUrl);
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
      const styleNames = this.styles.map(style => style.styleName);
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

export default Styles;
