'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var compassSVG = '<svg width="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"/><path fill="#212121" d="M12 3l4 8H8z"/><path fill="#9E9E9E" d="M12 21l-4-8h8z"/></g></svg>';

var _class = function () {
  function _class() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, _class);

    this.options = options;
    this.toggle = this.toggle.bind(this);
  }

  _createClass(_class, [{
    key: 'insertControls',
    value: function insertControls() {
      this.container = document.createElement('div');
      this.compassButton = document.createElement('div');
      this.container.classList.add('mapboxgl-ctrl');
      this.container.style.background = '#fff';
      this.container.style.boxShadow = '0 1px 4px rgba(0, 0, 0, .3)';
      this.container.style.borderRadius = '2px';
      this.container.style.overflow = 'hidden';
      this.container.style.opacity = '0';
      this.container.style.transition = '.2s opacity ease-in-out';
      this.container.classList.add('mapbox-ctrl-compass');
      this.compassButton.style.position = 'relative';
      this.compassButton.style.background = 'url(\'data:image/svg+xml,' + compassSVG + '\') center no-repeat';
      this.compassButton.style.width = '30px';
      this.compassButton.style.height = '30px';
      this.compassButton.style.cursor = 'pointer';
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

  return _class;
}();

exports.default = _class;