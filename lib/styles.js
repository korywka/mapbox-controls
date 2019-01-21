(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.StylesControl = factory());
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

  var stylesDefault = [{
    name: 'Streets',
    url: 'mapbox://styles/mapbox/streets-v9'
  }, {
    name: 'Satellite',
    url: 'mapbox://styles/mapbox/satellite-v9'
  }];

  var Styles =
  /*#__PURE__*/
  function () {
    function Styles(styles) {
      _classCallCheck(this, Styles);

      this.styles = styles || stylesDefault;
    }

    _createClass(Styles, [{
      key: "insertControls",
      value: function insertControls() {
        var _this = this;

        this.container = document.createElement('div');
        this.container.classList.add('mapboxgl-ctrl');
        this.container.classList.add('mapboxgl-ctrl-group');
        this.container.classList.add('mapboxgl-ctrl-styles');
        this.nodes = [];
        this.styles.forEach(function (style) {
          var node = document.createElement('button');
          node.textContent = style.name;
          node.addEventListener('click', function () {
            if (node.classList.contains('-active')) return;

            _this.map.setStyle(style.url);
          });

          _this.nodes.push(node);

          _this.container.appendChild(node);
        });
      }
    }, {
      key: "onAdd",
      value: function onAdd(map) {
        var _this2 = this;

        this.map = map;
        this.insertControls();
        this.map.on('styledata', function () {
          [].forEach.call(_this2.container.querySelectorAll('button'), function (div) {
            return div.classList.remove('-active');
          }); // remove GET params: ?optimize=true

          var styleUrls = _this2.styles.map(function (style) {
            if (typeof style.url === 'string') {
              var styleUrlSplit = style.url.split('?');
              return styleUrlSplit.length > 0 ? styleUrlSplit[0] : style.url;
            }

            return style.url;
          });

          var currentStyleIndex = styleUrls.indexOf(_this2.map.getStyle().sprite.replace('sprites', 'styles'));

          if (currentStyleIndex !== -1) {
            var currentNode = _this2.nodes[currentStyleIndex];
            currentNode.classList.add('-active');
          }
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

    return Styles;
  }();

  return Styles;

}));
