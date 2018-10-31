const stylesDefault = [
  {
    name: 'Streets',
    url: 'mapbox://styles/mapbox/streets-v9',
  }, {
    name: 'Satellite',
    url: 'mapbox://styles/mapbox/satellite-v9',
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
      node.textContent = style.name;
      node.addEventListener('click', () => {
        if (node.classList.contains('-active')) return;
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
      [].forEach.call(this.container.querySelectorAll('button'), div => div.classList.remove('-active'));
      const styleUrls = this.styles.map(style => style.url.split('?')[0]); // remove GET params: ?optimize=true
      const currentStyleIndex = styleUrls.indexOf(this.map.getStyle().sprite.replace('sprites', 'styles'));
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
