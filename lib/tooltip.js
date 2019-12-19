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

var defaultGetContent = function defaultGetContent(event) {
  var coords = event.lngLat;
  return "LngLat: ".concat(coords.lng.toFixed(6), ", ").concat(coords.lat.toFixed(6));
};

var mouseMoveEvent = 'mousemove';
var mapMoveEvent = 'move';
/**
 * Shows tooltip on hover on some layer or whole map.
 * @param {Object} options
 * @param {String} options.layer - Layer id to show the tooltip on hover.
 * If not specified, tooltip will be shown for whole map container
 * @param {Function} [options.getContent] - Triggered each time mouse moved over `layer` option.
 * Accepts `event` object
 */

var TooltipControl =
/*#__PURE__*/
function () {
  function TooltipControl() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, TooltipControl);

    this.layer = options.layer;
    this.getContent = options.getContent || defaultGetContent;
    this.container = document.createElement('div');
    this.eventShow = this.layer ? 'mouseenter' : 'mouseover';
    this.eventHide = this.layer ? 'mouseleave' : 'mouseout';
    this.node = document.createElement('div');
    this.node.classList.add('mapboxgl-ctrl-tooltip');
    this.lngLat = null;
    this.cursorStyle = '';
    this.show = this.show.bind(this);
    this.move = this.move.bind(this);
    this.hide = this.hide.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }

  _createClass(TooltipControl, [{
    key: "show",
    value: function show() {
      this.mapContainer.appendChild(this.node);
      this.cursorStyle = this.canvas.style.cursor;
      this.canvas.style.cursor = 'pointer';
      this.map.on(mapMoveEvent, this.updatePosition);
    }
  }, {
    key: "hide",
    value: function hide() {
      this.node.innerHTML = '';
      this.mapContainer.removeChild(this.node);
      this.canvas.style.cursor = this.cursorStyle;
      this.map.off(mapMoveEvent, this.updatePosition);
    }
  }, {
    key: "move",
    value: function move(event) {
      this.node.innerHTML = this.getContent(event);
      this.lngLat = event.lngLat;
      this.updatePosition();
    }
  }, {
    key: "updatePosition",
    value: function updatePosition() {
      if (!this.lngLat) return;
      var pos = this.map.project(this.lngLat);
      this.node.style.left = "".concat(pos.x, "px");
      this.node.style.top = "".concat(pos.y, "px");
    }
  }, {
    key: "onAdd",
    value: function onAdd(map) {
      this.map = map;
      this.mapContainer = this.map.getContainer();
      this.canvas = this.map.getCanvas();

      if (this.layer) {
        this.map.on(this.eventShow, this.layer, this.show);
        this.map.on(mouseMoveEvent, this.layer, this.move);
        this.map.on(this.eventHide, this.layer, this.hide);
      } else {
        this.map.on(this.eventShow, this.show);
        this.map.on(mouseMoveEvent, this.move);
        this.map.on(this.eventHide, this.hide);
      }

      return this.container;
    }
  }, {
    key: "onRemove",
    value: function onRemove() {
      if (this.layer) {
        this.map.off(this.eventShow, this.layer, this.show);
        this.map.off(mouseMoveEvent, this.layer, this.move);
        this.map.off(this.eventHide, this.layer, this.hide);
      } else {
        this.map.off(this.eventShow, this.show);
        this.map.off(mouseMoveEvent, this.move);
        this.map.off(this.eventHide, this.hide);
      }

      this.hide();
      this.map = undefined;
    }
  }]);

  return TooltipControl;
}();

export default TooltipControl;
