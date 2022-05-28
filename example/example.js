import mapboxgl from 'mapbox-gl';

import {
  CompassControl,
  // PictureControl,
  InspectControl,
  LanguageControl,
  RulerControl,
  StylesControl,
  ZoomControl,
  TooltipControl,
} from '../lib';

const languages = document.getElementById('languages');
const map = new mapboxgl.Map({
  accessToken: 'pk.eyJ1Ijoia29yeXdrYSIsImEiOiJja2p1ajdlOWozMnF2MzBtajRvOTVzZDRpIn0.nnlX7TDuZ3zuGkZGr_oA3A',
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 14,
  center: [30.5234, 50.4501],
});

const polygon = {
  id: 1234567890,
  type: 'Feature',
  properties: {},
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
  onChange: () => {
    languages.value = '';
  },
}), 'top-left');

/* Zoom */
map.addControl(new ZoomControl(), 'bottom-right');

/* Ruler */
map.addControl(new RulerControl({
  markerCSS: {
    borderColor: 'red',
  },
}), 'bottom-right');
map.on('ruler.on', () => console.log('%cruler.on', 'color: #3D5AFE'));
map.on('ruler.off', () => console.log('%cruler.off', 'color: #3D5AFE'));
map.on('ruler.change', (params) => {
  console.log('%cruler.change', 'color: #3D5AFE');
  console.table(params.coordinates);
});

/* Inspect */
map.addControl(new InspectControl({ console: true }), 'bottom-right');

/* Compass */
map.addControl(new CompassControl(), 'bottom-right');

/* Image */
// const pictureControl = new PictureControl();
// map.addControl(pictureControl, 'bottom-right');
// map.on('picture.add', (image) => console.log('%cpicture.add', 'color: #3D5AFE', image) );
// map.on('picture.select', (image) => console.log('%cpicture.select', 'color: #3D5AFE', image) );
// map.on('picture.update', (image) => console.log('%cpicture.update', 'color: #3D5AFE', image) );
// map.on('picture.deselect', (image) => console.log('%cpicture.deselect', 'color: #3D5AFE', image) );
// map.on('style.load', () => {
//   imageControl.addImage('https://img.lunstatic.net/building-800x600/41771.jpg', {
//     position: [
//       new mapboxgl.LngLat(30.500998190307115, 50.46018203970871),
//       new mapboxgl.LngLat(30.545801809692108, 50.46018203970871),
//       new mapboxgl.LngLat(30.545801809692108, 50.44001581151167),
//       new mapboxgl.LngLat(30.500998190307115, 50.44001581151167),
//     ],
//   });
// });


/* Tooltip */
map.addControl(new TooltipControl({
  layer: '$fill',
  getContent: (event) => {
    const coords = event.lngLat;

    return `Tooltip Example: ${coords.lng.toFixed(6)}, ${coords.lat.toFixed(6)}`;
  },
}));

map.on('style.load', () => {
  map.addLayer({
    id: '$fill',
    type: 'fill',
    source: { type: 'geojson', data: polygon },
    paint: { 'fill-opacity': 0.3, 'fill-color': '#4264fb' },
  });
  map.addLayer({
    id: '$line',
    type: 'line',
    source: { type: 'geojson', data: polygon },
    paint: { 'line-width': 2, 'line-color': '#4264fb' },
  });
});
