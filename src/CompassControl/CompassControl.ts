import iconPointer from '../icons/pointer';
import Base from '../Base/Base';
import Button from '../Button/Button';

interface CompassControlOptions {
  /** Show compass if bearing is 0 */
  instant?: boolean
}

export default class CompassControl extends Base {
  buttonCompass: Button
  instant: boolean

  constructor(options?: CompassControlOptions) {
    super();
    this.buttonCompass = new Button();
    this.instant = options?.instant ?? true;
    this.syncRotate = this.syncRotate.bind(this);
  }

  insert() {
    this.addClassName('mapbox-compass');
    if (!this.instant) this.node.hidden = true;
    this.buttonCompass
      .setIcon(iconPointer())
      .onClick(() => {
        this.map.easeTo({ bearing: 0, pitch: 0 });
      });
    this.addButton(this.buttonCompass);
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
    this.buttonCompass.icon!.style.transform = `rotate(${angle}deg)`;
  }
}
