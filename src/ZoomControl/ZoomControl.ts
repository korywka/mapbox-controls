import Base from '../Base/Base';
import Button from '../Button/Button';
import iconPlus from '../icons/plus';
import iconMinus from '../icons/minus';

export default class ZoomControl extends Base {
  zoomIn: Button
  zoomOut: Button

  constructor() {
    super();
    this.zoomIn = new Button();
    this.zoomOut = new Button();
  }

  insert() {
    this.addClassName('mapbox-zoom');
    this.zoomIn.setIcon(iconPlus());
    this.zoomIn.onClick(() => this.map.zoomIn());
    this.zoomOut.setIcon(iconMinus());
    this.zoomOut.onClick(() => this.map.zoomOut());
    this.addButton(this.zoomIn);
    this.addButton(this.zoomOut);
  }

  onAddControl() {
    this.insert();
  }
}
