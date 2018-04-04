'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var stylesDefault = [{
  name: 'Streets',
  url: 'mapbox://styles/mapbox/streets-v9'
}, {
  name: 'Satellite',
  url: 'mapbox://styles/mapbox/satellite-v9'
}];

var _class = function () {
  function _class(styles) {
    _classCallCheck(this, _class);

    this.styles = styles || stylesDefault;
  }

  _createClass(_class, [{
    key: 'insertControls',
    value: function insertControls() {
      var _this = this;

      this.container = document.createElement('div');
      this.container.classList.add('mapboxgl-ctrl');
      this.container.style.background = '#fff';
      this.container.style.boxShadow = '0 1px 4px rgba(0, 0, 0, .3)';
      this.container.style.fontSize = '12px';
      this.container.style.fontFamily = 'Open Sans, sans-serif';
      this.container.style.borderRadius = '2px';
      this.container.style.overflow = 'hidden';
      this.container.classList.add('mapbox-ctrl-styles');
      this.nodes = [];
      this.styles.forEach(function (style) {
        var node = document.createElement('div');
        node.textContent = style.name;
        node.style.padding = '4px 8px';
        node.style.cursor = 'pointer';
        node.style.float = 'left';
        node.style.background = '#f9f9f9';
        node.addEventListener('click', function () {
          _this.map.setStyle(style.url);
        });
        _this.nodes.push(node);
        _this.container.appendChild(node);
      });
    }
  }, {
    key: 'onAdd',
    value: function onAdd(map) {
      var _this2 = this;

      this.map = map;
      this.insertControls();
      this.map.on('styledata', function () {
        [].forEach.call(_this2.container.querySelectorAll('div'), function (div) {
          div.style.background = 'none';
          div.style.fontWeight = '400';
        });
        var styleUrls = _this2.styles.map(function (style) {
          return style.url;
        });
        var currentStyleIndex = styleUrls.indexOf(_this2.map.getStyle().sprite.replace('sprites', 'styles'));
        if (currentStyleIndex !== -1) {
          var currentNode = _this2.nodes[currentStyleIndex];
          currentNode.style.background = '#f9f9f9';
          currentNode.style.fontWeight = '600';
        }
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

  return _class;
}();

exports.default = _class;