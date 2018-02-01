import mapboxgl from 'mapbox-gl';
import { StylesControl } from '../../lib/index';
import Prism from "prismjs";

export default () => {
  const map = new mapboxgl.Map({
    container: 'styles-map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 10,
    center: [30.5234, 50.4501],
    scrollZoom: false,
  });
  const code = document.querySelector('#styles-code');
  const codeComment = document.querySelector('#styles-comment-code');

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
}]), 'top-left');`;

  codeComment.textContent =
`// Use style.load event to redraw layers when style has changed:
map.on('style.load', () => { addLayers(); });`;

  Prism.highlightElement(code);
  Prism.highlightElement(codeComment);
};
