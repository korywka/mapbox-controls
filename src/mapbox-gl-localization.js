const optionsDefault = {
  supportedLanguages: ['en', 'es', 'fr', 'de', 'ru', 'zh', 'ar', 'pt', 'local'],
  language: false,
  fallbackLanguage: 'local',
};

class Localization {
  constructor(options = {}) {
    this.options = Object.assign(optionsDefault, options);
    this.isLanguageField = /^{name/;
    this.localizeStyle = this.localizeStyle.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
  }

  getLocalizedStyle(language) {
    const style = this.map.getStyle();
    if (!language) {
      language = this.browserLanguage();
    }
    if (this.options.supportedLanguages.indexOf(language) === -1) {
      language = this.options.fallbackLanguage;
    }
    const localizedField = language === 'local' ? '{name}' : `{name_${language}}`;
    style.layers = style.layers.map(layer => this.localizeLayer(layer, localizedField));
    return style;
  }

  localizeLayer(layer, localizedField) {
    if (layer.layout && layer.layout['text-field']) {
      layer.layout['text-field'] = this.localizeTextField(layer.layout['text-field'], localizedField);
    }
    return layer;
  }

  localizeTextField(field, localizedField) {
    if (typeof field === 'string' && this.isLanguageField.test(field)) {
      return localizedField;
    } else if (typeof field === 'object' && field.stops) {
      return Object.assign({}, field, {
        stops: field.stops.map((stop) => {
          if (this.isLanguageField.test(stop[1])) {
            return [stop[0], localizedField];
          }
          return stop;
        }),
      });
    }
    return field;
  }

  localizeStyle() {
    /*
    * Apply styles only once
    * */
    this.map.off('styledata', this.localizeStyle);
    this.setLanguage(this.options.language);
  }

  browserLanguage() {
    const language = navigator.languages ?
      navigator.languages[0] : (navigator.language || navigator.userLanguage);
    const code = language.split('-')[0];
    if (this.options.supportedLanguages.indexOf(code) === -1) {
      return this.options.fallbackLanguage;
    }
    return code;
  }

  onAdd(map) {
    this.map = map;
    this.container = document.createElement('div');
    this.map.on('styledata', this.localizeStyle);
    this.map.setLanguage = this.setLanguage;
    return this.container;
  }

  onRemove() {
    this.map.off('styledata', this.localizeStyle);
    this.map.setLanguage = undefined;
    this.map = undefined;
  }

  setLanguage(language) {
    this.map.setStyle(this.getLocalizedStyle(language));
  }
}

export default Localization;
