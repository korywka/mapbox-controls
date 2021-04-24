import Base from '../Base/Base';
import { StyleOption, defaultStyleOptions } from './StyleOption';
import Button from '../Button/Button';

interface StylesControlOptions {
  /** Array of style options */
  styles?: StyleOption[]
  /** Triggered on style change */
  onChange?: (StyleOption) => void
}

/** Adds style switcher similar to Google Maps. */
export default class StylesControl extends Base {
  styles: StyleOption[]
  onChange: (StyleOption) => void
  buttons: Button[]

  constructor(options: StylesControlOptions) {
    super();
    this.styles = options?.styles ?? defaultStyleOptions;
    this.onChange = options?.onChange;
    this.buttons = [];
  }

  insert() {
    this.addClassName('mapbox-control-styles');
    this.styles.forEach((style) => {
      const button = new Button();
      button.setText(style.label);
      button.onClick(() => {
        if (button.node.classList.contains('-active')) return;
        this.map.setStyle(style.styleUrl);
        if (this.onChange) this.onChange(style);
      });
      this.buttons.push(button);
      this.addButton(button);
    });

    this.map.on('styledata', () => {
      this.buttons.forEach((button) => {
        button.removeClassName('-active');
      });
      const styleNames = this.styles.map(style => style.styleName);
      const currentStyleIndex = styleNames.indexOf(this.map.getStyle().name);
      if (currentStyleIndex !== -1) {
        const currentButton = this.buttons[currentStyleIndex];
        currentButton.addClassName('-active');
      }
    });
  }

  onAddControl() {
    this.insert();
  }
}
