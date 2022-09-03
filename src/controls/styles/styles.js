import Base from '../../base/Base.js';

export default class Styles extends Base {
  /**
   * @param {import('@types').Styles.Options=} options
   */
  constructor(options) {
    super();
    this.styles = options?.styles ?? this.defaultOptions;
    this.onChange = options?.onChange;
    /** @type HTMLButtonElement[] */
    this.buttons = [];
  }

  get defaultOptions() {
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

  $onAdd() {
    this.node.classList.add('mapbox-control-styles');
    this.styles.forEach((style) => {
      const button = Base.createButton({ text: style.label });
      button.addEventListener('click', () => {
        if (Base.isActivateButton(button)) return;
        this.map.setStyle(style.styleUrl);
        if (this.onChange) this.onChange(style);
      });
      this.buttons.push(button);
      this.addButton(button);
    });

    this.map.on('styledata', () => {
      this.buttons.forEach((button) => {
        Base.deactivateButton(button);
      });
      const styleNames = this.styles.map((style) => style.styleName);
      const styleName = this.map.getStyle().name;
      if (!styleName) throw Error('style must have name');
      const currentStyleIndex = styleNames.indexOf(styleName);
      if (currentStyleIndex !== -1) {
        const currentButton = this.buttons[currentStyleIndex];
        Base.activateButton(currentButton);
      }
    });
  }
}
