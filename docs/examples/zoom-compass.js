import mapboxgl from 'mapbox-gl';
import Prism from 'prismjs';
import { ZoomControl, CompassControl } from '../../lib/index';

export default () => {
  const map = new mapboxgl.Map({
    container: 'map-zoom-compass',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 10,
    center: [30.5234, 50.4501],
    scrollZoom: false,
  });
  const code = document.querySelector('#code-zoom-compass');

  map.addControl(new ZoomControl(), 'top-right');
  map.addControl(new CompassControl(), 'top-right');

  code.textContent =
    `import { ZoomControl, CompassControl } from 'mapbox-gl-controls;

map.addControl(new ZoomControl(), 'top-right');
map.addControl(new CompassControl(), 'top-right'); // visible after map rotation`;

  Prism.highlightElement(code);
};
