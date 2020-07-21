import mapboxgl from 'mapbox-gl';
import distance from '@turf/distance';
import iconRuler from './icon-ruler.svg';

const LAYER_LINE = 'controls-layer-line';
const LAYER_SYMBOL = 'controls-layer-symbol';
const SOURCE_LINE = 'controls-source-line';
const SOURCE_SYMBOL = 'controls-source-symbol';
const MAIN_COLOR = '#263238';
const HALO_COLOR = '#fff';

function geoLineString(coordinates = []) {
  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates,
    },
  };
}

function geoPoint(coordinates = [], labels = []) {
  return {
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
  };
}

function defaultLabelFormat(number) {
  if (number < 1) {
    return `${(number * 1000).toFixed()} m`;
  }
  return `${number.toFixed(2)} km`;
}

/**
 * Fires map `ruler.on` and `ruler.off`events at the beginning and at the end of measuring.
 * @param {Object} options
 * @param {String} [options.units='kilometers'] - Any units [@turf/distance](https://github.com/Turfjs/turf/tree/master/packages/turf-distance) supports
 * @param {Function} [options.labelFormat] - Accepts number and returns label.
 * Can be used to convert value to any measuring units
 * @param {Array} [options.font=['Roboto Medium']] - Array of fonts.
 * @param {String} [options.mainColor='#263238'] - Color of ruler lines.
 * @param {String} [options.secondaryColor='#fff'] - Color of halo and inner marker background.
 * @param {String} [options.fontSize='12'] - Label font size
 * @param {String} [options.fontHalo='1'] - Label font halo
 */

export default class RulerControl {
  constructor(options = {}) {
    this.isMeasuring = false;
    this.markers = [];
    this.coordinates = [];
    this.labels = [];
    this.units = options.units || 'kilometers';
    this.font = options.font || ['Roboto Medium'];
    this.fontSize = options.fontSize || 12;
    this.fontHalo = options.fontHalo || 1;
    this.labelFormat = options.labelFormat || defaultLabelFormat;
    this.mainColor = options.mainColor || MAIN_COLOR;
    this.secondaryColor = options.secondaryColor || HALO_COLOR;
    this.mapClickListener = this.mapClickListener.bind(this);
    this.styleLoadListener = this.styleLoadListener.bind(this);
  }

  insertControls() {
    this.container = document.createElement('div');
    this.container.classList.add('mapboxgl-ctrl');
    this.container.classList.add('mapboxgl-ctrl-group');
    this.container.classList.add('mapboxgl-ctrl-ruler');
    this.button = document.createElement('button');
    this.button.setAttribute('type', 'button');
    this.button.appendChild(iconRuler());
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
        'line-color': this.mainColor,
        'line-width': 2,
      },
    });

    this.map.addLayer({
      id: LAYER_SYMBOL,
      type: 'symbol',
      source: SOURCE_SYMBOL,
      layout: {
        'text-field': '{text}',
        'text-font': this.font,
        'text-anchor': 'top',
        'text-size': this.fontSize,
        'text-offset': [0, 0.8],
      },
      paint: {
        'text-color': this.mainColor,
        'text-halo-color': this.secondaryColor,
        'text-halo-width': this.fontHalo,
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
    this.markers.forEach((m) => m.remove());
    this.map.off('click', this.mapClickListener);
    this.map.off('style.load', this.styleLoadListener);
    this.map.fire('ruler.off');
  }

  mapClickListener(event) {
    const markerNode = document.createElement('div');
    markerNode.style.width = '12px';
    markerNode.style.height = '12px';
    markerNode.style.borderRadius = '50%';
    markerNode.style.background = this.secondaryColor;
    markerNode.style.boxSizing = 'border-box';
    markerNode.style.border = `2px solid ${this.mainColor}`;
    const marker = new mapboxgl.Marker({
      element: markerNode,
      draggable: true,
    })
      .setLngLat(event.lngLat)
      .addTo(this.map);
    this.coordinates.push([event.lngLat.lng, event.lngLat.lat]);
    this.labels = this.coordinatesToLabels();
    this.map.getSource(SOURCE_LINE)
      .setData(geoLineString(this.coordinates));
    this.map.getSource(SOURCE_SYMBOL)
      .setData(geoPoint(this.coordinates, this.labels));
    this.markers.push(marker);
    marker.on('drag', () => {
      const index = this.markers.indexOf(marker);
      const lngLat = marker.getLngLat();
      this.coordinates[index] = [lngLat.lng, lngLat.lat];
      this.labels = this.coordinatesToLabels();
      this.map.getSource(SOURCE_LINE)
        .setData(geoLineString(this.coordinates));
      this.map.getSource(SOURCE_SYMBOL)
        .setData(geoPoint(this.coordinates, this.labels));
    });
  }

  coordinatesToLabels() {
    const { coordinates, units, labelFormat } = this;
    let sum = 0;
    return coordinates.map((coordinate, index) => {
      if (index === 0) return labelFormat(0);
      sum += distance(coordinates[index - 1], coordinates[index], { units });
      return labelFormat(sum);
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
    if (this.isMeasuring) {
      this.measuringOff();
    }
    this.map.off('click', this.mapClickListener);
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }
}
