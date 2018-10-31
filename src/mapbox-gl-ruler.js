import mapboxgl from 'mapbox-gl';
import distance from '@turf/distance';

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
    this.styleLoadListener = this.styleLoadListener.bind(this);
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
