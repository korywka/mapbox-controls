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

function iconInspect() {
  return (new DOMParser().parseFromString("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"#505050\">\n    <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n    <path d=\"M20 19.59V8l-6-6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L20 19.59zM9 13c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z\"/>\n</svg>", 'image/svg+xml')).firstChild;
}

function iconLeft() {
  return (new DOMParser().parseFromString("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"#505050\">\n    <path d=\"M14 7l-5 5 5 5V7z\"/>\n    <path fill=\"none\" d=\"M24 0v24H0V0h24z\"/>\n</svg>", 'image/svg+xml')).firstChild;
}

function iconRight() {
  return (new DOMParser().parseFromString("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"#505050\">\n    <path d=\"M10 17l5-5-5-5v10z\"/>\n    <path fill=\"none\" d=\"M0 24V0h24v24H0z\"/>\n</svg>", 'image/svg+xml')).firstChild;
}

function featureData(feature) {
  var props = feature.properties;
  var data = [{
    key: '$id',
    value: feature.layer.id
  }, {
    key: '$type',
    value: feature.layer.type
  }, {
    key: 'source',
    value: feature.layer.source
  }, {
    key: 'source-layer',
    value: feature.layer['source-layer']
  }];
  Object.keys(props).forEach(function (key) {
    data.push({
      key: key,
      value: props[key]
    });
  });
  return data;
}

function popup(features) {
  var current = 0;
  var root = document.createElement('div');
  root.classList.add('mapboxgl-ctrl-inspect-popup');
  var content = document.createElement('div');
  content.classList.add('mapboxgl-ctrl-inspect-content');

  var templatePrev = function templatePrev() {
    var button = document.createElement('div');
    button.setAttribute('type', 'button');
    button.classList.add('mapboxgl-ctrl-inspect-prev');
    button.appendChild(iconLeft());
    button.addEventListener('click', function () {
      return goTo('-1');
    });
    return button;
  };

  var templateNext = function templateNext() {
    var button = document.createElement('div');
    button.setAttribute('type', 'button');
    button.classList.add('mapboxgl-ctrl-inspect-next');
    button.appendChild(iconRight());
    button.addEventListener('click', function () {
      return goTo('+1');
    });
    return button;
  };

  var templateTitle = function templateTitle() {
    var title = document.createElement('div');
    title.classList.add('mapboxgl-ctrl-inspect-current');
    title.textContent = "".concat(current + 1, " / ").concat(features.length);
    return title;
  };

  var templateHeader = function templateHeader() {
    var header = document.createElement('div');
    header.classList.add('mapboxgl-ctrl-inspect-header');
    header.appendChild(templatePrev());
    header.appendChild(templateTitle());
    header.appendChild(templateNext());
    return header;
  };

  var templateFeature = function templateFeature(feature) {
    var table = document.createElement('table');
    table.classList.add('mapboxgl-ctrl-inspect-feature');
    var data = featureData(feature);
    data.forEach(function (prop) {
      var row = document.createElement('tr');
      var key = document.createElement('th');
      var value = document.createElement('td');
      key.textContent = prop.key;
      value.textContent = prop.value;
      row.appendChild(key);
      row.appendChild(value);
      table.append(row);
    });
    return table;
  };

  function goTo(dir) {
    if (dir === '-1') {
      current = current !== 0 ? current - 1 : features.length - 1;
    } else if (dir === '+1') {
      current = current !== features.length - 1 ? current + 1 : 0;
    }

    content.innerHTML = '';
    content.appendChild(templateHeader());
    content.appendChild(templateFeature(features[current]));
  }

  root.appendChild(content);

  if (!features.length) {
    content.textContent = 'No features';
  } else {
    if (features.length > 1) {
      content.appendChild(templateHeader());
    }

    content.appendChild(templateFeature(features[current]));
  }

  return root;
}
/**
 * Inspect control to debug style layers and source
 */


var InspectControl = /*#__PURE__*/function () {
  function InspectControl() {
    _classCallCheck(this, InspectControl);
  }

  _createClass(InspectControl, [{
    key: "insertControls",
    value: function insertControls() {
      this.container = document.createElement('div');
      this.container.classList.add('mapboxgl-ctrl');
      this.container.classList.add('mapboxgl-ctrl-group');
      this.container.classList.add('mapboxgl-ctrl-inspect');
      this.button = document.createElement('button');
      this.button.setAttribute('type', 'button');
      this.button.appendChild(iconInspect());
      this.container.appendChild(this.button);
      this.popup = null;
      this.lngLat = null;
      this.clickListener = this.clickListener.bind(this);
      this.updatePosition = this.updatePosition.bind(this);
    }
  }, {
    key: "inspectingOn",
    value: function inspectingOn() {
      this.isInspecting = true;
      this.button.classList.add('-active');
      this.map.on('click', this.clickListener);
      this.map.on('move', this.updatePosition);
      this.map.getCanvas().style.cursor = 'pointer';
    }
  }, {
    key: "inspectingOff",
    value: function inspectingOff() {
      this.removePopup();
      this.isInspecting = false;
      this.button.classList.remove('-active');
      this.map.off('click', this.clickListener);
      this.map.off('move', this.updatePosition);
      this.map.getCanvas().style.cursor = '';
    }
  }, {
    key: "getFeatures",
    value: function getFeatures(event) {
      var selectThreshold = 3;
      var queryBox = [[event.point.x - selectThreshold, event.point.y + selectThreshold], // bottom left (SW)
      [event.point.x + selectThreshold, event.point.y - selectThreshold] // top right (NE)
      ];
      return this.map.queryRenderedFeatures(queryBox);
    }
  }, {
    key: "addPopup",
    value: function addPopup(features) {
      this.popup = popup(features);
      this.mapContainer.appendChild(this.popup);
      this.updatePosition();
    }
  }, {
    key: "removePopup",
    value: function removePopup() {
      if (!this.popup) return;
      this.mapContainer.removeChild(this.popup);
      this.popup = null;
    }
  }, {
    key: "updatePosition",
    value: function updatePosition() {
      if (!this.lngLat) return;
      var canvasRect = this.canvas.getBoundingClientRect();
      var pos = this.map.project(this.lngLat);
      this.popup.style.left = "".concat(pos.x - canvasRect.left, "px");
      this.popup.style.top = "".concat(pos.y - canvasRect.top, "px");
    }
  }, {
    key: "clickListener",
    value: function clickListener(event) {
      this.lngLat = event.lngLat;
      var features = this.getFeatures(event);
      this.removePopup();
      this.addPopup(features);
    }
  }, {
    key: "onAdd",
    value: function onAdd(map) {
      var _this = this;

      this.map = map;
      this.mapContainer = this.map.getContainer();
      this.canvas = this.map.getCanvas();
      this.isInspecting = false;
      this.insertControls();
      this.button.addEventListener('click', function () {
        if (_this.isInspecting) {
          _this.inspectingOff();
        } else {
          _this.inspectingOn();
        }
      });
      return this.container;
    }
  }, {
    key: "onRemove",
    value: function onRemove() {
      this.inspectingOff();
      this.container.parentNode.removeChild(this.container);
      this.map = undefined;
    }
  }]);

  return InspectControl;
}();

export default InspectControl;
