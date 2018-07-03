'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _theme = require('./theme');

var _theme2 = _interopRequireDefault(_theme);

var _icons = require('./icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Zoom = function () {
  function Zoom() {
    _classCallCheck(this, Zoom);
  }

  _createClass(Zoom, [{
    key: 'insertControls',
    value: function insertControls() {
      var _this = this;

      this.container = document.createElement('div');
      this.container.classList.add('mapboxgl-ctrl');
      this.container.style.background = _theme2.default.colorDefault;
      this.container.style.boxShadow = _theme2.default.boxShadow;
      this.container.style.borderRadius = _theme2.default.borderRadius;
      this.container.classList.add('mapbox-ctrl-zoom');
      this.zoomIn = document.createElement('div');
      this.zoomIn.style.borderBottom = _theme2.default.border;
      this.zoomIn.style.position = 'relative';
      this.zoomIn.innerHTML = _icons.PlusIcon;
      this.zoomOut = document.createElement('div');
      this.zoomOut.style.position = 'relative';
      this.zoomOut.innerHTML = _icons.MinusIcon;
      [this.zoomIn, this.zoomOut].forEach(function (node) {
        node.style.width = _theme2.default.width;
        node.style.height = _theme2.default.height;
        node.style.cursor = 'pointer';
        _this.container.appendChild(node);
      });
    }
  }, {
    key: 'onAdd',
    value: function onAdd(map) {
      var _this2 = this;

      this.map = map;
      this.insertControls();
      this.zoomIn.addEventListener('click', function () {
        _this2.map.zoomIn();
      });
      this.zoomOut.addEventListener('click', function () {
        _this2.map.zoomOut();
      });
      return this.container;
    }
  }, {
    key: 'onRemove',
    value: function onRemove() {
      this.container.parentNode.removeChild(this.container);
      this.map = undefined;
    }
  }]);

  return Zoom;
}();

exports.default = Zoom;