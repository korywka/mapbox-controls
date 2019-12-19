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

function iconPlus(attrs) {
  var node = (new DOMParser().parseFromString("<svg fill=\"#505050\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z\"/>\n    <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n</svg>", 'text/xml')).firstChild;
  if (attrs) {
    Object.keys(attrs).forEach(function(key) {
      node.setAttribute(key, attrs[key]);
    });
  }
  return node;
}

function iconMinus(attrs) {
  var node = (new DOMParser().parseFromString("<svg fill=\"#505050\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M19 13H5v-2h14v2z\"/>\n    <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n</svg>", 'text/xml')).firstChild;
  if (attrs) {
    Object.keys(attrs).forEach(function(key) {
      node.setAttribute(key, attrs[key]);
    });
  }
  return node;
}

/**
 * Simple zoom control
 */

var ZoomControl =
/*#__PURE__*/
function () {
  function ZoomControl() {
    _classCallCheck(this, ZoomControl);
  }

  _createClass(ZoomControl, [{
    key: "insertControls",
    value: function insertControls() {
      this.container = document.createElement('div');
      this.container.classList.add('mapboxgl-ctrl');
      this.container.classList.add('mapboxgl-ctrl-group');
      this.container.classList.add('mapboxgl-ctrl-zoom');
      this.zoomIn = document.createElement('button');
      this.zoomIn.setAttribute('type', 'button');
      this.zoomIn.appendChild(iconPlus());
      this.zoomOut = document.createElement('button');
      this.zoomOut.setAttribute('type', 'button');
      this.zoomOut.appendChild(iconMinus());
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

  return ZoomControl;
}();

export default ZoomControl;
