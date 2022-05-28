import Base from '../../base/base.js';
import iconPlus from '../../icons/js/plus.js';
import iconMinus from '../../icons/js/minus.js';

export default class Zoom extends Base {
  /**
   * @param {import('../../types').ZoomOptions=} options
   */
  constructor(options) {
    super(options);
    this.buttonIn = Base.createButton({
      icon: iconPlus(),
      title: this.strings.zoomIn,
    });
    this.buttonOut = Base.createButton({
      icon: iconMinus(),
      title: this.strings.zoomOut,
    });
  }

  $onAdd() {
    this.node.classList.add('mapbox-zoom');
    this.buttonIn.addEventListener('click', () => this.map.zoomIn());
    this.buttonOut.addEventListener('click', () => this.map.zoomOut());
    this.addButton(this.buttonIn);
    this.addButton(this.buttonOut);
  }
}
