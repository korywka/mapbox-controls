import Base from '../Base/Base';
import Button from '../Button/Button';
import { StyleOption } from './types';

interface StylesControlOptions {
  /** Array of style options */
  styles?: StyleOption[]
  /** Triggered on style change */
  onChange?: (style: StyleOption) => void
}

export default class StylesControl extends Base {
  styles: StyleOption[]
  onChange?: (style: StyleOption) => void
  buttons: Button[]

  constructor(options?: StylesControlOptions) {
    super();
    this.styles = options?.styles ?? this.defaultOptions;
    this.onChange = options?.onChange;
    this.buttons = [];
  }

  insert() {
    this.addClassName('mapbox-control-styles');
    this.styles.forEach((style) => {
      const button = new Button();
      button.setText(style.label);
      button.onClick(() => {
        if (button.isActive()) return;
        this.map.setStyle(style.styleUrl);
        if (this.onChange) this.onChange(style);
      });
      this.buttons.push(button);
      this.addButton(button);
    });

    this.map.on('styledata', () => {
      this.buttons.forEach((button) => {
        button.setActive(false);
      });
      const styleNames = this.styles.map(style => style.styleName);
      const styleName = this.map.getStyle().name;
      if (!styleName) throw Error('style must have name');
      const currentStyleIndex = styleNames.indexOf(styleName);
      if (currentStyleIndex !== -1) {
        const currentButton = this.buttons[currentStyleIndex];
        currentButton.setActive(true);
      }
    });
  }

  get defaultOptions(): StyleOption[] {
    return [
      {
        label: 'Streets',
        styleName: 'Mapbox Streets',
        styleUrl: 'mapbox://styles/mapbox/streets-v11',
      }, {
        label: 'Satellite',
        styleName: 'Mapbox Satellite Streets',
        styleUrl: 'mapbox://sprites/mapbox/satellite-streets-v11',
      },
    ];
  }

  onAddControl() {
    this.insert();
  }
}
