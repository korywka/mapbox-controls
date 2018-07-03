import mapboxgl from 'mapbox-gl';
import distance from '@turf/distance';
import theme from './theme';
import { RulerIcon } from './icons';

const LAYER_LINE = 'controls-layer-line';
const LAYER_SYMBOL = 'controls-layer-symbol';
const SOURCE_LINE = 'controls-source-line';
const SOURCE_SYMBOL = 'controls-source-symbol';

const geoLineString = (coordinates = []) => ({
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'LineString',
    coordinates,
  },
});

const geoPoint = (coordinates = [], labels = []) => ({
  type: 'FeatureCollection',
  features: coordinates.map((c, i) => ({
    type: 'Feature',
    properties: {
      text: labels[i],
    },
    geometry: {
      type: 'Point',
      coordinates: c,
    },
  })),
});

const coordinatesToLabels = (coordinates) => {
  let sum = 0;
  return coordinates.map((c, i) => {
    if (i === 0) return 0;
    sum += distance(coordinates[i - 1], coordinates[i]);
    if (sum < 1) {
      return `${(sum * 1000).toFixed()} m`;
    }
    return `${sum.toFixed(2)} km`;
  });
};

class Ruler {
  constructor() {
    this.isMeasuring = false;
    this.markers = [];
    this.coordinates = [];
    this.labels = [];
    this.mapClickListener = this.mapClickListener.bind(this);
  }

  insertControls() {
    this.container = document.createElement('div');
    this.rulerButton = document.createElement('div');
    this.container.classList.add('mapboxgl-ctrl');
    this.container.style.background = theme.colorDefault;
    this.container.style.boxShadow = theme.boxShadow;
    this.container.style.borderRadius = theme.borderRadius;
    this.container.classList.add('mapbox-ctrl-ruler');
    this.rulerButton.style.position = 'relative';
    this.rulerButton.style.width = theme.width;
    this.rulerButton.style.height = theme.height;
    this.rulerButton.style.cursor = 'pointer';
    this.rulerButton.innerHTML = RulerIcon;
    this.container.appendChild(this.rulerButton);
  }

  measuringOn() {
    this.map.getCanvas().style.cursor = 'crosshair';
    this.container.style.background = theme.colorSelected;
    this.rulerButton.querySelector('svg').setAttribute('fill', theme.colorHighlight);
    this.map.addLayer({
      id: LAYER_LINE,
      type: 'line',
      source: SOURCE_LINE,
      paint: {
        'line-color': '#263238',
        'line-width': 2,
      },
    });
    this.map.addLayer({
      id: LAYER_SYMBOL,
      type: 'symbol',
      source: SOURCE_SYMBOL,
      layout: {
        'text-field': '{text}',
        'text-font': ['Roboto Medium'],
        'text-anchor': 'top',
        'text-size': 12,
        'text-offset': [0, 0.8],
      },
      paint: {
        'text-color': '#263238',
        'text-halo-color': '#fff',
        'text-halo-width': 1,
      },
    });
  }

  measuringOff() {
    this.map.getCanvas().style.removeProperty('cursor');
    this.container.style.background = theme.colorDefault;
    this.rulerButton.querySelector('svg').removeAttribute('fill');
    // clear map and data
    this.map.removeLayer(LAYER_LINE);
    this.map.removeLayer(LAYER_SYMBOL);
    this.markers.forEach(m => m.remove());
    this.markers = [];
    this.coordinates = [];
    this.labels = [];
    this.map.getSource(SOURCE_LINE).setData(geoLineString());
    this.map.getSource(SOURCE_SYMBOL).setData(geoPoint());
  }

  mapClickListener(event) {
    const markerNode = document.createElement('div');
    markerNode.style.width = '12px';
    markerNode.style.height = '12px';
    markerNode.style.borderRadius = '50%';
    markerNode.style.background = '#fff';
    markerNode.style.boxSizing = 'border-box';
    markerNode.style.border = '2px solid #263238';
    const marker = new mapboxgl.Marker({
      element: markerNode,
      draggable: true,
    })
      .setLngLat(event.lngLat)
      .addTo(this.map);
    this.coordinates.push([event.lngLat.lng, event.lngLat.lat]);
    this.labels = coordinatesToLabels(this.coordinates);
    this.map.getSource(SOURCE_LINE).setData(geoLineString(this.coordinates));
    this.map.getSource(SOURCE_SYMBOL).setData(geoPoint(this.coordinates, this.labels));
    this.markers.push(marker);
    marker.on('drag', () => {
      const index = this.markers.indexOf(marker);
      const lngLat = marker.getLngLat();
      this.coordinates[index] = [lngLat.lng, lngLat.lat];
      this.labels = coordinatesToLabels(this.coordinates);
      this.map.getSource(SOURCE_LINE).setData(geoLineString(this.coordinates));
      this.map.getSource(SOURCE_SYMBOL).setData(geoPoint(this.coordinates, this.labels));
    });
  }

  onAdd(map) {
    this.map = map;
    this.insertControls();
    this.rulerButton.addEventListener('click', () => {
      if (this.isMeasuring) {
        this.isMeasuring = false;
        this.measuringOff();
        this.map.off('click', this.mapClickListener);
      } else {
        this.isMeasuring = true;
        this.measuringOn();
        this.map.on('click', this.mapClickListener);
      }
    });
    this.map.addSource(SOURCE_LINE, {
      type: 'geojson',
      data: geoLineString(),
    });
    this.map.addSource(SOURCE_SYMBOL, {
      type: 'geojson',
      data: geoPoint(),
    });
    return this.container;
  }

  onRemove() {
    this.measuringOff();
    this.map.off('click', this.mapClickListener);
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }
}

export default Ruler;
