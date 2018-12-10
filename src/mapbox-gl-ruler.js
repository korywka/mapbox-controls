import mapboxgl from 'mapbox-gl';
import distance from '@turf/distance';
import { convertLength } from '@turf/helpers'

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

const coordinatesToLabels = (coordinates, units) => {
  let sum = 0;
  let metric = 0;
  let meters, kilometers = 0;
  const isImperial = !!(units === 'imperial')
  
  return coordinates.map((c, i) => {
    if (i === 0) return 0;
    sum += distance(coordinates[i - 1], coordinates[i]);
    if (sum < 1) {
      meters = (sum*1000).toFixed()
      if(isImperial){
        return `${(convertLength(meters, 'meters', 'feet')).toFixed(2)} ft`
      }
      metric = `${meters} m`;
      return metric
    }
    kilometers = sum.toFixed(2)
    if(isImperial){
      return `${(convertLength(kilometers, 'kilometers', 'miles')).toFixed(2)} mi`
    }
    metric = `${kilometers} km`;
    return metric
  });
};

class Ruler {
  constructor(units = 'metric') {
    this.isMeasuring = false;
    this.markers = [];
    this.coordinates = [];
    this.labels = [];
    this.mapClickListener = this.mapClickListener.bind(this);
    this.styleLoadListener = this.styleLoadListener.bind(this);
    this.units = units;
  }

  insertControls() {
    this.container = document.createElement('div');
    this.container.classList.add('mapboxgl-ctrl');
    this.container.classList.add('mapboxgl-ctrl-group');
    this.container.classList.add('mapboxgl-ctrl-ruler');
    this.button = document.createElement('button');
    this.container.appendChild(this.button);
  }

  draw() {
    this.map.addSource(SOURCE_LINE, {
      type: 'geojson',
      data: geoLineString(this.coordinates),
    });

    this.map.addSource(SOURCE_SYMBOL, {
      type: 'geojson',
      data: geoPoint(this.coordinates, this.labels),
    });

    this.map.addLayer({
      id: LAYER_LINE,
      type: 'line',
      source: SOURCE_LINE,
      paint: {
        'line-color': '#f49b42',
        'line-width': 2,
      },
    });

    this.map.addLayer({
      id: LAYER_SYMBOL,
      type: 'symbol',
      source: SOURCE_SYMBOL,
      layout: {
        'text-field': '{text}',
        'text-font': ['Roboto Bold'],
        'text-anchor': 'top',
        'text-size': 18,
        'text-offset': [0, 0.8],
      },
      paint: {
        'text-color': '#f49b42',
        'text-halo-color': '#000',
        'text-halo-width': 5,
        'text-halo-blur': 20,
      },
    });
  }

  measuringOn() {
    this.isMeasuring = true;
    this.markers = [];
    this.coordinates = [];
    this.labels = [];
    this.map.getCanvas().style.cursor = 'crosshair';
    this.button.classList.add('-active');
    this.draw();
    this.map.on('click', this.mapClickListener);
    this.map.on('style.load', this.styleLoadListener);
    this.map.fire('ruler.on');
  }

  measuringOff() {
    this.isMeasuring = false;
    this.map.getCanvas().style.cursor = '';
    this.button.classList.remove('-active');
    // remove layers, sources and event listeners
    this.map.removeLayer(LAYER_LINE);
    this.map.removeLayer(LAYER_SYMBOL);
    this.map.removeSource(SOURCE_LINE);
    this.map.removeSource(SOURCE_SYMBOL);
    this.markers.forEach(m => m.remove());
    this.map.off('click', this.mapClickListener);
    this.map.off('style.load', this.styleLoadListener);
    this.map.fire('ruler.off');
  }

  mapClickListener(event) {
    const markerNode = document.createElement('div');
    markerNode.style.width = '12px';
    markerNode.style.height = '12px';
    markerNode.style.borderRadius = '50%';
    markerNode.style.background = '#f49b42';
    markerNode.style.boxSizing = 'border-box';
    markerNode.style.border = '2px solid #000000';
    const marker = new mapboxgl.Marker({
      element: markerNode,
      draggable: true,
    })
      .setLngLat(event.lngLat)
      .addTo(this.map);
    this.coordinates.push([event.lngLat.lng, event.lngLat.lat]);
    this.labels = coordinatesToLabels(this.coordinates, this.units);
    this.map.getSource(SOURCE_LINE).setData(geoLineString(this.coordinates));
    this.map.getSource(SOURCE_SYMBOL).setData(geoPoint(this.coordinates, this.labels));
    this.markers.push(marker);
    marker.on('drag', () => {
      const index = this.markers.indexOf(marker);
      const lngLat = marker.getLngLat();
      this.coordinates[index] = [lngLat.lng, lngLat.lat];
      this.labels = coordinatesToLabels(this.coordinates, this.units);
      this.map.getSource(SOURCE_LINE).setData(geoLineString(this.coordinates));
      this.map.getSource(SOURCE_SYMBOL).setData(geoPoint(this.coordinates, this.labels));
    });
  }

  setUnit(units){
    this.units = units; 
    this.labels = coordinatesToLabels(this.coordinates, this.units);
    this.map.getSource(SOURCE_SYMBOL).setData(geoPoint(this.coordinates, this.labels));
  }

  styleLoadListener() {
    this.draw();
  }

  onAdd(map) {
    this.map = map;
    this.insertControls();
    this.button.addEventListener('click', () => {
      if (this.isMeasuring) {
        this.measuringOff();
      } else {
        this.measuringOn();
      }
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
