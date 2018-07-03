import mapboxgl from 'mapbox-gl';
import Prism from 'prismjs';
import { StylesControl, RulerControl } from '../../lib';

export default () => {
  const map = new mapboxgl.Map({
    container: 'map-ruler',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 14,
    center: [-122.431297, 37.773972],
  });
  const code = document.querySelector('#code-ruler');

  map.on('load', () => {
    map.addControl(new RulerControl(), 'top-right');
    map.addControl(new StylesControl(), 'top-left');
  });

  code.textContent =
    `import { RulerControl } from 'mapbox-gl-controls;

map.addControl(new RulerControl(), 'top-right');`;

  Prism.highlightElement(code);
};
