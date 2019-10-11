import mapboxgl from 'mapbox-gl';
import StylesControl from '../lib/styles';
import CompassControl from '../lib/compass';
import RulerControl from '../lib/ruler';
import ZoomControl from '../lib/zoom';
import LanguageControl from '../lib/language';
import InspectControl from '../lib/inspect';
import TooltipControl from '../lib/tooltip';

mapboxgl.accessToken = 'pk.eyJ1IjoiYnJhdmVjb3ciLCJhIjoiY2o1ODEwdWljMThwbTJ5bGk0a294ZmVybiJ9.kErON3w2kwEVxU5aNa-EqQ';

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
      ]
    ]
  }
};

map.addControl(new ZoomControl(), 'bottom-right');
map.addControl(new CompassControl(), 'bottom-right');
map.addControl(new RulerControl(), 'bottom-right');
map.addControl(new StylesControl({
  onChange: () => {
    languages.value = '';
  },
}), 'top-left');
map.addControl(new InspectControl(), 'bottom-right');

(() => {
  const languageControl = new LanguageControl();
  map.addControl(languageControl);

  languages.addEventListener('change', () => {
    languageControl.setLanguage(languages.value);
  });
})();

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
    }
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
    }
  });
  map.addControl(new TooltipControl({
    layer: '$fill'
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
