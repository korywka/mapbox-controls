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

function iconPointer(attrs) {
  var node = (new DOMParser().parseFromString("<svg viewBox=\"0 0 24 24\" width=\"22\" height=\"22\" xmlns=\"http://www.w3.org/2000/svg\">\n    <g fill=\"none\" fill-rule=\"evenodd\">\n        <path d=\"M0 0h24v24H0z\"/>\n        <path fill=\"#f44336\" d=\"M12 3l4 8H8z\"/>\n        <path fill=\"#9E9E9E\" d=\"M12 21l-4-8h8z\"/>\n    </g>\n</svg>", 'text/xml')).firstChild;
  if (attrs) {
    Object.keys(attrs).forEach(function(key) {
      node.setAttribute(key, attrs[key]);
    });
  }
  return node;
}

/**
 * Simple compass
 * @param {Object} options
 * @param {Boolean} [options.instant=true] - Show compass if bearing is 0
 */

var CompassControl =
/*#__PURE__*/
function () {
  function CompassControl() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CompassControl);

    this.instant = typeof options.instant === 'boolean' ? options.instant : true;
    this.onRotate = this.onRotate.bind(this);
  }

  _createClass(CompassControl, [{
    key: "insertControls",
    value: function insertControls() {
      this.container = document.createElement('div');
      this.button = document.createElement('button');
      this.button.setAttribute('type', 'button');
      this.container.classList.add('mapboxgl-ctrl');
      this.container.classList.add('mapboxgl-ctrl-group');
      this.container.classList.add('mapboxgl-ctrl-compass');
      this.pointer = iconPointer();

      if (this.instant) {
        this.container.classList.add('-active');
      }

      this.container.appendChild(this.button);
      this.button.appendChild(this.pointer);
    }
  }, {
    key: "onAdd",
    value: function onAdd(map) {
      var _this = this;

      this.map = map;
      this.insertControls();
      this.button.addEventListener('click', function () {
        _this.map.easeTo({
          bearing: 0,
          pitch: 0
        });
      });
      this.map.on('rotate', this.onRotate);
      this.onRotate();
      return this.container;
    }
  }, {
    key: "onRemove",
    value: function onRemove() {
      this.container.parentNode.removeChild(this.container);
      this.map = undefined;
    }
  }, {
    key: "onRotate",
    value: function onRotate() {
      var angle = this.map.getBearing() * -1;

      if (!this.instant) {
        if (angle === 0) {
          this.container.classList.remove('-active');
        } else {
          this.container.classList.add('-active');
        }
      }

      this.pointer.style.transform = "rotate(".concat(angle, "deg)");
    }
  }]);

  return CompassControl;
}();

export default CompassControl;
