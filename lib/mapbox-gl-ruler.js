'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mapboxGl = require('mapbox-gl');

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

var _distance = require('@turf/distance');

var _distance2 = _interopRequireDefault(_distance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LAYER_LINE = 'controls-layer-line';
var LAYER_SYMBOL = 'controls-layer-symbol';
var SOURCE_LINE = 'controls-source-line';
var SOURCE_SYMBOL = 'controls-source-symbol';

var geoLineString = function geoLineString() {
  var coordinates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: coordinates
    }
  };
};

var geoPoint = function geoPoint() {
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
};

var coordinatesToLabels = function coordinatesToLabels(coordinates) {
  var sum = 0;
  return coordinates.map(function (c, i) {
    if (i === 0) return 0;
    sum += (0, _distance2.default)(coordinates[i - 1], coordinates[i]);
    if (sum < 1) {
      return (sum * 1000).toFixed() + ' m';
    }
    return sum.toFixed(2) + ' km';
  });
};

var Ruler = function () {
  function Ruler() {
    _classCallCheck(this, Ruler);

    this.isMeasuring = false;
    this.markers = [];
    this.coordinates = [];
    this.labels = [];
    this.mapClickListener = this.mapClickListener.bind(this);
    this.styleLoadListener = this.styleLoadListener.bind(this);
  }

  _createClass(Ruler, [{
    key: 'insertControls',
    value: function insertControls() {
      this.container = document.createElement('div');
      this.container.classList.add('mapboxgl-ctrl');
      this.container.classList.add('mapboxgl-ctrl-group');
      this.container.classList.add('mapboxgl-ctrl-ruler');
      this.button = document.createElement('button');
      this.container.appendChild(this.button);
    }
  }, {
    key: 'draw',
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
          'text-font': ['Roboto Medium'],
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
    key: 'measuringOn',
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
    key: 'measuringOff',
    value: function measuringOff() {
      this.isMeasuring = false;
      this.map.getCanvas().style.cursor = '';
      this.button.classList.remove('-active');
      // remove layers, sources and event listeners
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
    key: 'mapClickListener',
    value: function mapClickListener(event) {
      var _this = this;

      var markerNode = document.createElement('div');
      markerNode.style.width = '12px';
      markerNode.style.height = '12px';
      markerNode.style.borderRadius = '50%';
      markerNode.style.background = '#fff';
      markerNode.style.boxSizing = 'border-box';
      markerNode.style.border = '2px solid #263238';
      var marker = new _mapboxGl2.default.Marker({
        element: markerNode,
        draggable: true
      }).setLngLat(event.lngLat).addTo(this.map);
      this.coordinates.push([event.lngLat.lng, event.lngLat.lat]);
      this.labels = coordinatesToLabels(this.coordinates);
      this.map.getSource(SOURCE_LINE).setData(geoLineString(this.coordinates));
      this.map.getSource(SOURCE_SYMBOL).setData(geoPoint(this.coordinates, this.labels));
      this.markers.push(marker);
      marker.on('drag', function () {
        var index = _this.markers.indexOf(marker);
        var lngLat = marker.getLngLat();
        _this.coordinates[index] = [lngLat.lng, lngLat.lat];
        _this.labels = coordinatesToLabels(_this.coordinates);
        _this.map.getSource(SOURCE_LINE).setData(geoLineString(_this.coordinates));
        _this.map.getSource(SOURCE_SYMBOL).setData(geoPoint(_this.coordinates, _this.labels));
      });
    }
  }, {
    key: 'styleLoadListener',
    value: function styleLoadListener() {
      this.draw();
    }
  }, {
    key: 'onAdd',
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
    key: 'onRemove',
    value: function onRemove() {
      this.measuringOff();
      this.map.off('click', this.mapClickListener);
      this.container.parentNode.removeChild(this.container);
      this.map = undefined;
    }
  }]);

  return Ruler;
}();

exports.default = Ruler;