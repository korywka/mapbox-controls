import Base from '../Base/Base';
import Button from '../Button/Button';
import iconPlus from '../icons/plus';
import iconMinus from '../icons/minus';

export default class ZoomControl extends Base {
  buttonZoomIn: Button
  buttonZoomOut: Button

  constructor() {
    super();
    this.buttonZoomIn = new Button();
    this.buttonZoomOut = new Button();
  }

  insert() {
    this.addClassName('mapbox-zoom');
    this.buttonZoomIn.setIcon(iconPlus()).onClick(() => this.map.zoomIn());
    this.buttonZoomOut.setIcon(iconMinus()).onClick(() => this.map.zoomOut());
    this.addButton(this.buttonZoomIn, this.buttonZoomOut);
  }

  onAddControl() {
    this.insert();
  }
}
