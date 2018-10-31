'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
      this.compassButton = document.createElement('button');
      this.icon = document.createElement('span');
      this.container.classList.add('mapboxgl-ctrl');
      this.container.classList.add('mapboxgl-ctrl-group');
      this.container.classList.add('mapboxgl-ctrl-bearing');
      this.container.appendChild(this.compassButton);
      this.compassButton.appendChild(this.icon);
    }
  }, {
    key: 'onAdd',
    value: function onAdd(map) {
      var _this = this;

      this.map = map;
      this.insertControls();
      this.container.addEventListener('click', function () {
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
      if (angle === 0) {
        this.container.classList.remove('-active');
      } else {
        this.container.classList.add('-active');
      }
      this.icon.style.transform = 'rotate(' + angle + 'deg)';
    }
  }]);

  return Compass;
}();

exports.default = Compass;