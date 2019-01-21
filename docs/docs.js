import 'normalize.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'prismjs/themes/prism.css';
import '../mapbox-gl-controls.css';
import './docs.css';
import exampleLocalization from './examples/localization';
import exampleStyles from './examples/styles';
import exampleZoomCompass from './examples/zoom-compass';
import exampleRuler from './examples/ruler';

mapboxgl.accessToken = 'pk.eyJ1IjoiYnJhdmVjb3ciLCJhIjoiY2o1ODEwdWljMThwbTJ5bGk0a294ZmVybiJ9.kErON3w2kwEVxU5aNa-EqQ';

exampleLocalization();
exampleStyles();
exampleZoomCompass();
exampleRuler();
