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

var Compass = function () {
  function Compass() {
    _classCallCheck(this, Compass);

    this.toggle = this.toggle.bind(this);
  }

  _createClass(Compass, [{
    key: 'insertControls',
    value: function insertControls() {
      this.container = document.createElement('div');
      this.compassButton = document.createElement('div');
      this.container.classList.add('mapboxgl-ctrl');
      this.container.style.background = _theme2.default.colorDefault;
      this.container.style.boxShadow = _theme2.default.boxShadow;
      this.container.style.borderRadius = _theme2.default.borderRadius;
      this.container.style.overflow = 'hidden';
      this.container.style.opacity = '0';
      this.container.style.transition = _theme2.default.transition;
      this.container.classList.add('mapbox-ctrl-compass');
      this.compassButton.style.position = 'relative';
      this.compassButton.style.width = _theme2.default.width;
      this.compassButton.style.height = _theme2.default.height;
      this.compassButton.style.cursor = 'pointer';
      this.compassButton.innerHTML = _icons.CompassIcon;
      this.container.appendChild(this.compassButton);
    }
  }, {
    key: 'onAdd',
    value: function onAdd(map) {
      var _this = this;

      this.map = map;
      this.insertControls();
      this.compassButton.addEventListener('click', function () {
        _this.map.resetNorth();
      });
      this.map.on('rotate', this.toggle);
      this.toggle();
      return this.container;
    }
  }, {
    key: 'onRemove',
    value: function onRemove() {
      this.container.parentNode.removeChild(this.container);
      this.map = undefined;
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      var angle = this.map.getBearing() * -1;
      this.container.style.opacity = angle === 0 ? '0' : '1';
      this.compassButton.style.transform = 'rotate(' + angle + 'deg)';
    }
  }]);

  return Compass;
}();

exports.default = Compass;