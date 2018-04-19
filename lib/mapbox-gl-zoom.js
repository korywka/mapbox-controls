'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var addSVG = '<svg fill="#232323" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';

var removeSVG = '<svg fill="#232323" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M19 13H5v-2h14v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';

var _class = function () {
  function _class() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, _class);

    this.options = options;
  }

  _createClass(_class, [{
    key: 'insertControls',
    value: function insertControls() {
      var _this = this;

      this.container = document.createElement('div');
      this.container.classList.add('mapboxgl-ctrl');
      this.container.style.background = '#fff';
      this.container.style.boxShadow = '0 1px 4px rgba(0, 0, 0, .3)';
      this.container.style.borderRadius = '2px';
      this.container.classList.add('mapbox-ctrl-zoom');
      this.zoomIn = document.createElement('div');
      this.zoomOut = document.createElement('div');
      this.zoomIn.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
      this.zoomIn.style.background = 'url(\'data:image/svg+xml,' + addSVG + '\') center no-repeat';
      this.zoomOut.style.background = 'url(\'data:image/svg+xml,' + removeSVG + '\') center no-repeat';
      [this.zoomIn, this.zoomOut].forEach(function (node) {
        node.style.width = '30px';
        node.style.height = '30px';
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

  return _class;
}();

exports.default = _class;