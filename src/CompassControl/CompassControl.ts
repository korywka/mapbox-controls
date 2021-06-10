import iconPointer from '../icons/pointer';
import Base from '../Base/Base';
import Button from '../Button/Button';

interface CompassControlOptions {
  /** Show compass if bearing is 0 */
  instant?: boolean
}

export default class CompassControl extends Base {
  button: Button
  instant: boolean

  constructor(options?: CompassControlOptions) {
    super();
    this.button = new Button();
    this.instant = options?.instant ?? true;
    this.syncRotate = this.syncRotate.bind(this);
  }

  insert() {
    this.addClassName('mapbox-compass');
    if (!this.instant) this.node.hidden = true;
    this.button.setIcon(iconPointer());
    this.button.onClick(() => {
      this.map.easeTo({ bearing: 0, pitch: 0 });
    });
    this.addButton(this.button);
  }

  onAddControl() {
    this.insert();
    this.syncRotate();
    this.map.on('rotate', this.syncRotate);
  }


  syncRotate() {
    const angle = this.map.getBearing() * (-1);
    if (!this.instant) {
      this.node.hidden = angle === 0;
    }
    this.button.icon.style.transform = `rotate(${angle}deg)`;
  }
}
