import Base from '../../base/base.js';
import iconPointer from '../../icons/js/pointer.js';

export default class Compass extends Base {
  /**
   * @param {import('../../types').CompassOptions=} options
   */
  constructor(options) {
    super(options);
    this.icon = iconPointer();
    this.button = Base.createButton({
      icon: this.icon,
      title: this.strings.compass,
    });
    this.instant = options?.instant ?? true;
    this.sync = this.sync.bind(this);
  }

  $onAdd() {
    this.node.classList.add('mapbox-compass');
    if (!this.instant) this.node.hidden = true;
    this.button.addEventListener('click', () => {
      this.map.easeTo({ bearing: 0, pitch: 0 });
    });
    this.addButton(this.button);
    this.sync();
    this.map.on('rotate', this.sync);

  }

  sync() {
    const angle = this.map.getBearing() * (-1);
    if (!this.instant) {
      this.node.hidden = angle === 0;
    }
    this.icon.style.transform = `rotate(${angle}deg)`;
  }
}
