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

var defaultStyles = [{
  label: 'Streets',
  styleName: 'Mapbox Streets',
  styleUrl: 'mapbox://styles/mapbox/streets-v11'
}, {
  label: 'Satellite',
  styleName: 'Mapbox Satellite Streets',
  styleUrl: 'mapbox://sprites/mapbox/satellite-streets-v11'
}];
/**
 * Adds style switcher similar to Google Maps.
 * @param {Object} options
 * @param {Array} [options.styles] - Array of style objects:
 * @param {String} options.styles.label - Style label to display on switcher
 * @param {String} options.styles.styleName - [Style name from spec](https://docs.mapbox.com/mapbox-gl-js/style-spec/#root-name)
 * @param {String} options.styles.styleUrl - Style url
 * @param {Function} [options.onChange] - Triggered on style change. Accepts `style` object
 */

var StylesControl =
/*#__PURE__*/
function () {
  function StylesControl() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, StylesControl);

    this.styles = options.styles || defaultStyles;
    this.onChange = options.onChange;
  }

  _createClass(StylesControl, [{
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
        node.setAttribute('type', 'button');
        node.textContent = style.label;
        node.addEventListener('click', function () {
          if (node.classList.contains('-active')) return;

          _this.map.setStyle(style.styleUrl);

          if (_this.onChange) _this.onChange(style);
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
          div.classList.remove('-active');
        });

        var styleNames = _this2.styles.map(function (style) {
          return style.styleName;
        });

        var currentStyleIndex = styleNames.indexOf(_this2.map.getStyle().name);

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

  return StylesControl;
}();

export default StylesControl;
