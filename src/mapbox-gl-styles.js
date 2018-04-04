const stylesDefault = [
  {
    name: 'Streets',
    url: 'mapbox://styles/mapbox/streets-v9',
  }, {
    name: 'Satellite',
    url: 'mapbox://styles/mapbox/satellite-v9',
  },
];

export default class {
  constructor(styles) {
    this.styles = styles || stylesDefault;
  }

  insertControls() {
    this.container = document.createElement('div');
    this.container.classList.add('mapboxgl-ctrl');
    this.container.style.background = '#fff';
    this.container.style.boxShadow = '0 1px 4px rgba(0, 0, 0, .3)';
    this.container.style.fontSize = '12px';
    this.container.style.fontFamily = 'Open Sans, sans-serif';
    this.container.style.borderRadius = '2px';
    this.container.style.overflow = 'hidden';
    this.container.classList.add('mapbox-ctrl-styles');
    this.nodes = [];
    this.styles.forEach((style) => {
      const node = document.createElement('div');
      node.textContent = style.name;
      node.style.padding = '4px 8px';
      node.style.cursor = 'pointer';
      node.style.float = 'left';
      node.style.background = '#f9f9f9';
      node.addEventListener('click', () => {
        this.map.setStyle(style.url);
      });
      this.nodes.push(node);
      this.container.appendChild(node);
    });
  }

  onAdd(map) {
    this.map = map;
    this.insertControls();
    this.map.on('styledata', () => {
      [].forEach.call(this.container.querySelectorAll('div'), (div) => {
        div.style.background = 'none';
        div.style.fontWeight = '400';
      });
      const styleUrls = this.styles.map(style => style.url);
      const currentStyleIndex = styleUrls.indexOf(this.map.getStyle().sprite.replace('sprites', 'styles'));
      if (currentStyleIndex !== -1) {
        const currentNode = this.nodes[currentStyleIndex];
        currentNode.style.background = '#f9f9f9';
        currentNode.style.fontWeight = '600';
      }
    });
    return this.container;
  }

  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }
}
