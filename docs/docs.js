import mapboxgl from 'mapbox-gl';
import StylesControl from '../lib/styles';
import CompassControl from '../lib/compass';
import RulerControl from '../lib/ruler';
import ZoomControl from '../lib/zoom';
import LanguageControl from '../lib/language';
import InspectControl from '../lib/inspect';
import TooltipControl from '../lib/tooltip';

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('./sw.js', {
//     scope: '/',
//     origins: ['*'],
//   })
//     .then(function (registration) {
//       console.log('Registration successful, scope is:', registration.scope);
//     })
//     .catch(function (error) {
//       console.log('Service worker registration failed, error:', error);
//     });
// }

mapboxgl.accessToken = 'pk.eyJ1Ijoia29yeXdrYSIsImEiOiJja2p1ajdlOWozMnF2MzBtajRvOTVzZDRpIn0.nnlX7TDuZ3zuGkZGr_oA3A';

const languages = document.getElementById('languages');
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 14,
  center: [30.5234, 50.4501],
});
const geoJSON = {
  type: 'Feature',
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [30.51611423492432, 50.452667766971196],
        [30.514655113220215, 50.449006093706274],
        [30.516843795776367, 50.44862351447756],
        [30.518345832824707, 50.45217591688964],
        [30.51611423492432, 50.452667766971196],
      ],
    ],
  },
};

/* Language */
const languageControl = new LanguageControl();
map.addControl(languageControl);
languages.addEventListener('change', () => {
  languageControl.setLanguage(languages.value);
});

/* Style */
map.addControl(new StylesControl({
  onChange: () => languages.value = '',
}), 'top-left');

/* Zoom */
map.addControl(new ZoomControl(), 'bottom-right');

/* Ruler */
map.addControl(new RulerControl(), 'bottom-right');

/* Inspect */
map.addControl(new InspectControl(), 'bottom-right');

/* Compass */
map.addControl(new CompassControl(), 'bottom-right');

map.on('load', () => {
  map.addLayer({
    id: '$fill',
    type: 'fill',
    source: {
      type: 'geojson',
      data: geoJSON,
    },
    paint: {
      'fill-opacity': 0.3,
      'fill-color': '#4264fb',
    },
  });
  map.addLayer({
    id: '$line',
    type: 'line',
    source: {
      type: 'geojson',
      data: geoJSON,
    },
    paint: {
      'line-width': 2,
      'line-color': '#4264fb',
    },
  });
  map.addControl(new TooltipControl({
    layer: '$fill',
  }));
});

/* Example for mapbox issue: https://github.com/mapbox/mapbox-gl-js/issues/8765 */
map.on('load', () => {
  console.log('load');
});
map.on('style.load', () => {
  console.log('style.load');
});
map.on('styledata', () => {
  console.log('styledata');
});
