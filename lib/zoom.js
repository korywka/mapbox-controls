(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.MapZoom = factory());
}(this, function () { 'use strict';

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

  var Zoom =
  /*#__PURE__*/
  function () {
    function Zoom() {
      _classCallCheck(this, Zoom);
    }

    _createClass(Zoom, [{
      key: "insertControls",
      value: function insertControls() {
        this.container = document.createElement('div');
        this.container.classList.add('mapboxgl-ctrl');
        this.container.classList.add('mapboxgl-ctrl-group');
        this.container.classList.add('mapboxgl-ctrl-zoom');
        this.zoomIn = document.createElement('button');
        this.zoomOut = document.createElement('button');
        this.container.appendChild(this.zoomIn);
        this.container.appendChild(this.zoomOut);
      }
    }, {
      key: "onAdd",
      value: function onAdd(map) {
        var _this = this;

        this.map = map;
        this.insertControls();
        this.zoomIn.addEventListener('click', function () {
          _this.map.zoomIn();
        });
        this.zoomOut.addEventListener('click', function () {
          _this.map.zoomOut();
        });
        return this.container;
      }
    }, {
      key: "onRemove",
      value: function onRemove() {
        this.container.parentNode.removeChild(this.container);
        this.map = undefined;
      }
    }]);

    return Zoom;
  }();

  return Zoom;

}));
