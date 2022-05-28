import Base from '../../base/base.js';
import iconInspect from '../../icons/js/inspect.js';
import popup from './popup.js';

export default class Inspect extends Base {
  /**
   * @param {import('../../types').InspectOptions=} options
   */
  constructor(options) {
    super();
    this.console = options?.console;
    this.isInspecting = false;
    this.button = Base.createButton({
      icon: iconInspect(),
      title: this.strings.inspect,
    });
    this.mapClickListener = this.mapClickListener.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }

  inspectingOn() {
    this.isInspecting = true;
    Base.activateButton(this.button);
    this.map.on('click', this.mapClickListener);
    this.map.on('move', this.updatePosition);
    this.map.getCanvas().style.cursor = 'pointer';
  }

  inspectingOff() {
    this.isInspecting = false;
    Base.deactivateButton(this.button);
    this.map.off('click', this.mapClickListener);
    this.map.off('move', this.updatePosition);
    this.map.getCanvas().style.cursor = '';
    this.removePopup();
  }

  /**
   * @param {import('mapbox-gl').MapMouseEvent} event
   * @returns {*}
   */
  getFeatures(event) {
    const selectThreshold = 3;
    /** @type {[[number, number], [number, number]]} */
    const queryBox = [
      [event.point.x - selectThreshold, event.point.y + selectThreshold], // bottom left (SW)
      [event.point.x + selectThreshold, event.point.y - selectThreshold], // top right (NE)
    ];

    return this.map.queryRenderedFeatures(queryBox);
  }

  /**
   * @param {import('mapbox-gl').MapboxGeoJSONFeature[]} features
   */
  addPopup(features) {
    this.popupNode = popup(features);
    this.map.getContainer().appendChild(this.popupNode);
    this.updatePosition();
    if (this.console) {
      console.log(features);
    }
  }

  removePopup() {
    if (!this.popupNode) return;
    this.map.getContainer().removeChild(this.popupNode);
    this.popupNode = undefined;
  }

  updatePosition() {
    if (!this.lngLat) return;
    if (!this.popupNode) return;
    const canvasRect = this.map.getCanvas().getBoundingClientRect();
    const pos = this.map.project(this.lngLat);
    this.popupNode.style.left = `${pos.x - canvasRect.left}px`;
    this.popupNode.style.top = `${pos.y - canvasRect.top}px`;
  }

  /**
   * @param {import('mapbox-gl').MapMouseEvent} event
   */
  mapClickListener(event) {
    this.lngLat = event.lngLat;
    const features = this.getFeatures(event);
    this.removePopup();
    this.addPopup(features);
  }

  $onAdd() {
    this.node.classList.add('mapbox-control-inspect');
    this.button.addEventListener('click', () => {
      if (this.isInspecting) {
        this.inspectingOff();
      } else {
        this.inspectingOn();
      }
    });
    this.addButton(this.button);
  }

  $onRemove() {
    this.inspectingOff();
  }
}
