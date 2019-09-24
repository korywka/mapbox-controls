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

function iconCCW(attrs) {
  var node = (new DOMParser().parseFromString("<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"#9E9E9E\" width=\"11\" height=\"28\" viewBox=\"0 0 11 28\">\n    <path d=\"M7.2 20.5C6.4 18.6 6 16.4 6 14.2c.2-4.1 2-7.8 4.9-10.4L7.5 0C3.7 3.5 1.2 8.4 1 13.9c-.1 3.3.6 6.4 1.9 9.1L.2 24.6l.5.9L8.2 28l.8-.4 1.2-7.8-.5-.9-2.5 1.6z\"/>\n</svg>", 'text/xml')).firstChild;
  if (attrs) {
    Object.keys(attrs).forEach(function(key) {
      node.setAttribute(key, attrs[key]);
    });
  }
  return node;
}

function iconCW(attrs) {
  var node = (new DOMParser().parseFromString("<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"#9E9E9E\" width=\"11\" height=\"28\" viewBox=\"0 0 11 28\">\n    <path d=\"M8.2 23.1c1.3-2.8 2-5.9 1.9-9.1C9.9 8.4 7.4 3.5 3.6 0L.1 3.7C3 6.3 4.8 10 5 14.1c.1 2.2-.3 4.4-1.2 6.3l-2.6-1.5-.5.9L2 27.6l.9.5 7.5-2.5.5-.9-2.7-1.6z\"/>\n</svg>", 'text/xml')).firstChild;
  if (attrs) {
    Object.keys(attrs).forEach(function(key) {
      node.setAttribute(key, attrs[key]);
    });
  }
  return node;
}

function iconPointer(attrs) {
  var node = (new DOMParser().parseFromString("<svg viewBox=\"0 0 24 24\" width=\"22\" height=\"22\" xmlns=\"http://www.w3.org/2000/svg\">\n    <g fill=\"none\" fill-rule=\"evenodd\">\n        <path d=\"M0 0h24v24H0z\"/>\n        <path fill=\"#505050\" d=\"M12 3l4 8H8z\"/>\n        <path fill=\"#9E9E9E\" d=\"M12 21l-4-8h8z\"/>\n    </g>\n</svg>", 'text/xml')).firstChild;
  if (attrs) {
    Object.keys(attrs).forEach(function(key) {
      node.setAttribute(key, attrs[key]);
    });
  }
  return node;
}

/**
 * @param {Object} options
 * @param {Boolean} [options.instant=true] - Show compass if bearing is 0
 */

var Compass =
/*#__PURE__*/
function () {
  function Compass() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Compass);

    this.instant = typeof options.instant === 'boolean' ? options.instant : true;
    this.toggle = this.toggle.bind(this);
  }

  _createClass(Compass, [{
    key: "insertControls",
    value: function insertControls() {
      this.container = document.createElement('div');
      this.compassButton = document.createElement('button');
      this.container.classList.add('mapboxgl-ctrl');
      this.container.classList.add('mapboxgl-ctrl-group');
      this.container.classList.add('mapboxgl-ctrl-compass');
      this.pointer = iconPointer({
        "class": 'mapboxgl-ctrl-compass-pointer'
      });
      this.arrowCW = iconCW({
        "class": 'mapboxgl-ctrl-compass-cw'
      });
      this.arrowCCW = iconCCW({
        "class": 'mapboxgl-ctrl-compass-ccw'
      });

      if (this.instant) {
        this.container.classList.add('-active');
      }

      this.container.appendChild(this.compassButton);
      this.compassButton.appendChild(this.pointer);
      this.compassButton.appendChild(this.arrowCW);
      this.compassButton.appendChild(this.arrowCCW);
    }
  }, {
    key: "onAdd",
    value: function onAdd(map) {
      var _this = this;

      this.map = map;
      this.insertControls();
      this.compassButton.addEventListener('click', function () {
        _this.map.easeTo({
          pitch: 0,
          bearing: 0
        });
      });
      this.arrowCW.addEventListener('click', function (e) {
        e.stopPropagation();

        if (!_this.map.isRotating()) {
          _this.map.easeTo({
            bearing: _this.map.getBearing() - 45
          });
        }
      });
      this.arrowCCW.addEventListener('click', function (e) {
        e.stopPropagation();

        if (!_this.map.isRotating()) {
          _this.map.easeTo({
            bearing: _this.map.getBearing() + 45
          });
        }
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

  return Compass;
}();

export default Compass;
