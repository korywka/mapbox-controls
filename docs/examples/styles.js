import mapboxgl from 'mapbox-gl';
import Prism from 'prismjs';
import { StylesControl } from '../../lib/index';

export default () => {
  const map = new mapboxgl.Map({
    container: 'map-styles',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 10,
    center: [30.5234, 50.4501],
    scrollZoom: false,
  });
  const code = document.querySelector('#code-styles');

  map.addControl(new StylesControl([{
    name: 'Streets',
    url: 'mapbox://styles/mapbox/streets-v9',
  }, {
    name: 'Satellite',
    url: 'mapbox://styles/mapbox/satellite-v9',
  }, {
    name: 'Dark',
    url: 'mapbox://styles/mapbox/dark-v9',
  }]), 'top-left');

  code.textContent =
    `import { StylesControl } from 'mapbox-gl-controls;

map.addControl(new StylesControl([{
  name: 'Streets',
  url: 'mapbox://styles/mapbox/streets-v9'
}, {
  name: 'Satellite',
  url: 'mapbox://styles/mapbox/satellite-v9'
}, {
  name: 'Dark',
  url: 'mapbox://styles/mapbox/dark-v9'
}]), 'top-left');

// Use style.load event to redraw layers when style has changed:
map.on('style.load', () => { /* redraw layers */ });`;

  Prism.highlightElement(code);
};
