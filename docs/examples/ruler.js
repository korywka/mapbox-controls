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

  map.addControl(new RulerControl(), 'top-right');
  map.addControl(new StylesControl(), 'bottom-left');
  map.on('ruler.on', () => console.log('ruler: on'));
  map.on('ruler.off', () => console.log('ruler: off'));

  code.textContent =
`import { RulerControl } from 'mapbox-gl-controls;

map.addControl(new RulerControl(), 'top-right');
map.on('ruler.on', () => console.log('ruler: on'));
map.on('ruler.off', () => console.log('ruler: off'));`;

  Prism.highlightElement(code);
};
