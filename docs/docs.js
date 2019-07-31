import mapboxgl from 'mapbox-gl';
import StylesControl from '../lib/styles';
import CompassControl from '../lib/compass';
import RulerControl from '../lib/ruler';
import ZoomControl from '../lib/zoom';

mapboxgl.accessToken = 'pk.eyJ1IjoiYnJhdmVjb3ciLCJhIjoiY2o1ODEwdWljMThwbTJ5bGk0a294ZmVybiJ9.kErON3w2kwEVxU5aNa-EqQ';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9',
  zoom: 14,
  center: [30.5234, 50.4501],
  scrollZoom: false,
});

map.addControl(new StylesControl(), 'top-left');
map.addControl(new RulerControl(), 'top-right');
map.addControl(new CompassControl(), 'top-right');
map.addControl(new ZoomControl(), 'top-right');
map.addControl(new CompassControl({ instant: false }), 'bottom-right');
