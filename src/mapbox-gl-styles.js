import theme from './theme';

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
    this.container.style.background = theme.colorDefault;
    this.container.style.boxShadow = theme.boxShadow;
    this.container.style.fontSize = theme.fontSize;
    this.container.style.borderRadius = theme.borderRadius;
    this.container.style.overflow = 'hidden';
    this.container.classList.add('mapbox-ctrl-styles');
    this.nodes = [];
    this.styles.forEach((style) => {
      const node = document.createElement('div');
      node.textContent = style.name;
      node.style.padding = '5px 8px';
      node.style.cursor = 'pointer';
      node.style.float = 'left';
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
        div.style.fontWeight = theme.fontWeight;
      });
      const styleUrls = this.styles.map(style => style.url.split('?')[0]); // remove GET params: ?optimize=true
      const currentStyleIndex = styleUrls.indexOf(this.map.getStyle().sprite.replace('sprites', 'styles'));
      if (currentStyleIndex !== -1) {
        const currentNode = this.nodes[currentStyleIndex];
        currentNode.style.background = theme.colorSelected;
        currentNode.style.fontWeight = theme.fontWeightSelected;
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
