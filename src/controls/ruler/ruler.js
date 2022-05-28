import mapboxgl from 'mapbox-gl';
import distance from '@turf/distance';
import Base from '../../base/Base';
import iconRuler from '../../icons/js/ruler.js';

const LAYER_LINE = 'controls-layer-line';
const LAYER_MARKER = 'controls-layer-marker';
const SOURCE_LINE = 'controls-source-line';
const SOURCE_MARKER = 'controls-source-marker';


export default class Ruler extends Base {
  /**
   * @param {import('../../types').RulerOptions=} options
   */
  constructor(options) {
    super();
    this.isMeasuring = false;
    /** @type import('mapbox-gl').Marker[] */
    this.markers = [];
    /** @type import('geojson').Position[] */
    this.coordinates = [];
    /** @type string[] */
    this.labels = [];
    this.units = options?.units ?? 'kilometers';
    this.labelFormat = options?.labelFormat ?? Ruler.defaultLabelFormat;
    this.markerLayout = options?.markerLayout ?? {};
    this.markerPaint = options?.markerPaint ?? {};
    this.lineLayout = options?.lineLayout ?? {};
    this.linePaint = options?.linePaint ?? {};
    this.markerCSS = options?.markerCSS ?? {};
    this.button = Base.createButton({
      icon: iconRuler(),
      title: this.strings.ruler,
    });
    this.draw = this.draw.bind(this);
    this.mapClickListener = this.mapClickListener.bind(this);
  }

  draw() {
    this.map.addSource(SOURCE_LINE, {
      type: 'geojson',
      data: this.lineJSON,
    });

    this.map.addSource(SOURCE_MARKER, {
      type: 'geojson',
      data: this.markersJSON,
    });

    this.map.addLayer({
      id: LAYER_LINE,
      type: 'line',
      source: SOURCE_LINE,
      layout: {
        ...this.lineLayout,
      },
      paint: {
        'line-color': '#263238',
        'line-width': 2,
        ...this.linePaint,
      },
    });

    this.map.addLayer({
      id: LAYER_MARKER,
      type: 'symbol',
      source: SOURCE_MARKER,
      layout: {
        'text-field': '{text}',
        'text-font': ['Roboto Medium'],
        'text-anchor': 'top',
        'text-size': 12,
        'text-offset': [0, 0.8],
        ...this.markerLayout,
      },
      paint: {
        'text-color': '#263238',
        'text-halo-color': '#fff',
        'text-halo-width': 1,
        ...this.markerPaint,
      },
    });
  }

  measuringOn() {
    this.isMeasuring = true;
    this.markers = [];
    this.coordinates = [];
    this.labels = [];
    this.map.getCanvas().style.cursor = 'crosshair';
    this.draw();
    this.map.on('click', this.mapClickListener);
    this.map.on('style.load', this.draw);
    this.map.fire('ruler.on');
    Base.activateButton(this.button);
  }

  measuringOff() {
    this.isMeasuring = false;
    this.map.getCanvas().style.cursor = '';
    // remove layers, sources and event listeners
    this.map.removeLayer(LAYER_LINE);
    this.map.removeLayer(LAYER_MARKER);
    this.map.removeSource(SOURCE_LINE);
    this.map.removeSource(SOURCE_MARKER);
    this.markers.forEach((m) => m.remove());
    this.map.off('click', this.mapClickListener);
    this.map.off('style.load', this.draw);
    this.map.fire('ruler.off');
    Base.deactivateButton(this.button);
  }

  /**
   * @param {import('mapbox-gl').MapMouseEvent} event
   */
  mapClickListener(event) {
    const markerNode = this.getMarkerNode();
    const marker = new mapboxgl.Marker({ element: markerNode, draggable: true })
      .setLngLat(event.lngLat)
      .addTo(this.map);
    const newCoordinate = [event.lngLat.lng, event.lngLat.lat];
    this.coordinates.push(newCoordinate);
    this.updateLabels();
    this.updateSource();
    this.markers.push(marker);
    this.map.fire('ruler.change', { coordinates: this.coordinates });

    marker.on('drag', () => {
      const index = this.markers.indexOf(marker);
      const lngLat = marker.getLngLat();
      this.coordinates[index] = [lngLat.lng, lngLat.lat];
      this.updateLabels();
      this.updateSource();
    });

    marker.on('dragend', () => {
      this.map.fire('ruler.change', { coordinates: this.coordinates });
    });
  }

  updateSource() {
    const lineSource = /** @type import('mapbox-gl').GeoJSONSource */(this.map.getSource(SOURCE_LINE));
    const markerSource = /** @type import('mapbox-gl').GeoJSONSource */(this.map.getSource(SOURCE_MARKER));
    lineSource.setData(this.lineJSON);
    markerSource.setData(this.markersJSON);
  }

  updateLabels() {
    const { coordinates, units, labelFormat } = this;
    let sum = 0;
    this.labels = coordinates.map((coordinate, index) => {
      if (index === 0) return labelFormat(0);
      sum += distance(coordinates[index - 1], coordinates[index], { units });

      return labelFormat(sum);
    });
  }

  getMarkerNode() {
    const node = document.createElement('div');
    node.style.width = '12px';
    node.style.height = '12px';
    node.style.borderRadius = '50%';
    node.style.background = '#fff';
    node.style.boxSizing = 'border-box';
    node.style.border = '2px solid #263238';

    Object.entries(this.markerCSS).forEach(([key, value]) => {
      // @ts-expect-error
      node.style[key] = value;
    });

    return node;
  }

  /**
   * @returns {import('geojson').Feature}
   */
  get lineJSON() {
    return {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: this.coordinates,
      },
    };
  }

  /**
   * @returns {import('geojson').FeatureCollection}
   */
  get markersJSON() {
    return {
      type: 'FeatureCollection',
      features: this.coordinates.map((c, i) => ({
        type: 'Feature',
        properties: {
          text: this.labels[i],
        },
        geometry: {
          type: 'Point',
          coordinates: c,
        },
      })),
    };
  }

  /**
   * @param {number} number
   * @returns {string}
   */
  static defaultLabelFormat(number) {
    return number < 1
      ? `${(number * 1000).toFixed()} m`
      : `${number.toFixed(2)} km`;
  }

  $onAdd() {
    this.node.classList.add('mapbox-control-ruler');
    this.button.addEventListener('click', () => {
      if (this.isMeasuring) {
        this.measuringOff();
      } else {
        this.measuringOn();
      }
    });
    this.addButton(this.button);
  }

  $onRemove() {
    if (this.isMeasuring) this.measuringOff();
    this.map.off('click', this.mapClickListener);
  }
}
