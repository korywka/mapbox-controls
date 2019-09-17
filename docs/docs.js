import mapboxgl from 'mapbox-gl';
import StylesControl from '../lib/styles';
import CompassControl from '../lib/compass';
import RulerControl from '../lib/ruler';
import ZoomControl from '../lib/zoom';
import LanguageControl from '../lib/language';

mapboxgl.accessToken = 'pk.eyJ1IjoiYnJhdmVjb3ciLCJhIjoiY2o1ODEwdWljMThwbTJ5bGk0a294ZmVybiJ9.kErON3w2kwEVxU5aNa-EqQ';

const languages = document.getElementById('languages');
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 14,
  center: [30.5234, 50.4501],
});

map.on('load', () => {
  console.log('load');
});
map.on('style.load', () => {
  console.log('style.load');
});
map.on('styledata', () => {
  console.log('styledata');
});
map.addControl(new ZoomControl(), 'bottom-right');
map.addControl(new CompassControl(), 'bottom-right');
map.addControl(new RulerControl(), 'bottom-right');
map.addControl(new StylesControl({
  onChange: () => {
    languages.value = '';
  },
}), 'top-left');

(() => {
  const languageControl = new LanguageControl();
  map.addControl(languageControl);

  languages.addEventListener('change', () => {
    languageControl.setLanguage(languages.value);
  });
})();
