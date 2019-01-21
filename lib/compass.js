(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.MapCompass = factory());
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

  var Compass =
  /*#__PURE__*/
  function () {
    function Compass() {
      _classCallCheck(this, Compass);

      this.toggle = this.toggle.bind(this);
    }

    _createClass(Compass, [{
      key: "insertControls",
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
      key: "onAdd",
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
      key: "onRemove",
      value: function onRemove() {
        this.container.parentNode.removeChild(this.container);
        this.map = undefined;
      }
    }, {
      key: "toggle",
      value: function toggle() {
        var angle = this.map.getBearing() * -1;

        if (angle === 0) {
          this.container.classList.remove('-active');
        } else {
          this.container.classList.add('-active');
        }

        this.icon.style.transform = "rotate(".concat(angle, "deg)");
      }
    }]);

    return Compass;
  }();

  return Compass;

}));
