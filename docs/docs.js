import 'normalize.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'prismjs/themes/prism.css';
import './docs.css';
import localizationExample from './examples/localization';
import stylesExample from './examples/styles';
import zoomCompassExample from './examples/zoom-compass';

mapboxgl.accessToken = 'pk.eyJ1IjoiYnJhdmVjb3ciLCJhIjoiY2o1ODEwdWljMThwbTJ5bGk0a294ZmVybiJ9.kErON3w2kwEVxU5aNa-EqQ';

localizationExample();
stylesExample();
zoomCompassExample();
