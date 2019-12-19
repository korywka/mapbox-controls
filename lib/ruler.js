import mapboxgl from 'mapbox-gl';
import distance from '@turf/distance';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function iconRuler(attrs) {
  var node = (new DOMParser().parseFromString("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"22\" height=\"12\" viewBox=\"0 0 22 12\" fill=\"#505050\">\n    <path fill-rule=\"evenodd\" fill=\"none\" d=\"M-1-6h24v24H-1z\"/>\n    <path d=\"M20 0H2C.9 0 0 .9 0 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm0 10H2V2h2v4h2V2h2v4h2V2h2v4h2V2h2v4h2V2h2v8z\"/>\n</svg>", 'text/xml')).firstChild;
  if (attrs) {
    Object.keys(attrs).forEach(function(key) {
      node.setAttribute(key, attrs[key]);
    });
  }
  return node;
}

var LAYER_LINE = 'controls-layer-line';
var LAYER_SYMBOL = 'controls-layer-symbol';
var SOURCE_LINE = 'controls-source-line';
var SOURCE_SYMBOL = 'controls-source-symbol';

function geoLineString() {
  var coordinates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: coordinates
    }
  };
}

function geoPoint() {
  var coordinates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var labels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return {
    type: 'FeatureCollection',
    features: coordinates.map(function (c, i) {
      return {
        type: 'Feature',
        properties: {
          text: labels[i]
        },
        geometry: {
          type: 'Point',
          coordinates: c
        }
      };
    })
  };
}

function defaultLabelFormat(number) {
  if (number < 1) {
    return "".concat((number * 1000).toFixed(), " m");
  }

  return "".concat(number.toFixed(2), " km");
}
/**
 * Fires map `ruler.on` and `ruler.off`events at the beginning and at the end of measuring.
 * @param {Object} options
 * @param {String} [options.units='kilometers'] - Any units [@turf/distance](https://github.com/Turfjs/turf/tree/master/packages/turf-distance) supports
 * @param {Function} [options.labelFormat] - Accepts number and returns label.
 * Can be used to convert value to any measuring units
 * @param {Array} [options.font=['Roboto Medium']] - Array of fonts.
 */


var RulerControl =
/*#__PURE__*/
function () {
  function RulerControl() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, RulerControl);

    this.isMeasuring = false;
    this.markers = [];
    this.coordinates = [];
    this.labels = [];
    this.units = options.units || 'kilometers';
    this.font = options.font || ['Roboto Medium'];
    this.labelFormat = options.labelFormat || defaultLabelFormat;
    this.mapClickListener = this.mapClickListener.bind(this);
    this.styleLoadListener = this.styleLoadListener.bind(this);
  }

  _createClass(RulerControl, [{
    key: "insertControls",
    value: function insertControls() {
      this.container = document.createElement('div');
      this.container.classList.add('mapboxgl-ctrl');
      this.container.classList.add('mapboxgl-ctrl-group');
      this.container.classList.add('mapboxgl-ctrl-ruler');
      this.button = document.createElement('button');
      this.button.setAttribute('type', 'button');
      this.button.appendChild(iconRuler());
      this.container.appendChild(this.button);
    }
  }, {
    key: "draw",
    value: function draw() {
      this.map.addSource(SOURCE_LINE, {
        type: 'geojson',
        data: geoLineString(this.coordinates)
      });
      this.map.addSource(SOURCE_SYMBOL, {
        type: 'geojson',
        data: geoPoint(this.coordinates, this.labels)
      });
      this.map.addLayer({
        id: LAYER_LINE,
        type: 'line',
        source: SOURCE_LINE,
        paint: {
          'line-color': '#263238',
          'line-width': 2
        }
      });
      this.map.addLayer({
        id: LAYER_SYMBOL,
        type: 'symbol',
        source: SOURCE_SYMBOL,
        layout: {
          'text-field': '{text}',
          'text-font': this.font,
          'text-anchor': 'top',
          'text-size': 12,
          'text-offset': [0, 0.8]
        },
        paint: {
          'text-color': '#263238',
          'text-halo-color': '#fff',
          'text-halo-width': 1
        }
      });
    }
  }, {
    key: "measuringOn",
    value: function measuringOn() {
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
  }, {
    key: "measuringOff",
    value: function measuringOff() {
      this.isMeasuring = false;
      this.map.getCanvas().style.cursor = '';
      this.button.classList.remove('-active'); // remove layers, sources and event listeners

      this.map.removeLayer(LAYER_LINE);
      this.map.removeLayer(LAYER_SYMBOL);
      this.map.removeSource(SOURCE_LINE);
      this.map.removeSource(SOURCE_SYMBOL);
      this.markers.forEach(function (m) {
        return m.remove();
      });
      this.map.off('click', this.mapClickListener);
      this.map.off('style.load', this.styleLoadListener);
      this.map.fire('ruler.off');
    }
  }, {
    key: "mapClickListener",
    value: function mapClickListener(event) {
      var _this = this;

      var markerNode = document.createElement('div');
      markerNode.style.width = '12px';
      markerNode.style.height = '12px';
      markerNode.style.borderRadius = '50%';
      markerNode.style.background = '#fff';
      markerNode.style.boxSizing = 'border-box';
      markerNode.style.border = '2px solid #263238';
      var marker = new mapboxgl.Marker({
        element: markerNode,
        draggable: true
      }).setLngLat(event.lngLat).addTo(this.map);
      this.coordinates.push([event.lngLat.lng, event.lngLat.lat]);
      this.labels = this.coordinatesToLabels();
      this.map.getSource(SOURCE_LINE).setData(geoLineString(this.coordinates));
      this.map.getSource(SOURCE_SYMBOL).setData(geoPoint(this.coordinates, this.labels));
      this.markers.push(marker);
      marker.on('drag', function () {
        var index = _this.markers.indexOf(marker);

        var lngLat = marker.getLngLat();
        _this.coordinates[index] = [lngLat.lng, lngLat.lat];
        _this.labels = _this.coordinatesToLabels();

        _this.map.getSource(SOURCE_LINE).setData(geoLineString(_this.coordinates));

        _this.map.getSource(SOURCE_SYMBOL).setData(geoPoint(_this.coordinates, _this.labels));
      });
    }
  }, {
    key: "coordinatesToLabels",
    value: function coordinatesToLabels() {
      var coordinates = this.coordinates,
          units = this.units,
          labelFormat = this.labelFormat;
      var sum = 0;
      return coordinates.map(function (coordinate, index) {
        if (index === 0) return 0;
        sum += distance(coordinates[index - 1], coordinates[index], {
          units: units
        });
        return labelFormat(sum);
      });
    }
  }, {
    key: "styleLoadListener",
    value: function styleLoadListener() {
      this.draw();
    }
  }, {
    key: "onAdd",
    value: function onAdd(map) {
      var _this2 = this;

      this.map = map;
      this.insertControls();
      this.button.addEventListener('click', function () {
        if (_this2.isMeasuring) {
          _this2.measuringOff();
        } else {
          _this2.measuringOn();
        }
      });
      return this.container;
    }
  }, {
    key: "onRemove",
    value: function onRemove() {
      if (this.isMeasuring) {
        this.measuringOff();
      }

      this.map.off('click', this.mapClickListener);
      this.container.parentNode.removeChild(this.container);
      this.map = undefined;
    }
  }]);

  return RulerControl;
}();

export default RulerControl;
