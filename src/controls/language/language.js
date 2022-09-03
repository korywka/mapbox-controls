import Base from '../../base/base.js';

/**
 * Supported languages: https://docs.mapbox.com/help/troubleshooting/change-language/
 */
const SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'de', 'ru', 'zh', 'pt', 'ar', 'ja', 'ko', 'mul'];

export default class Language extends Base {
  /**
   * @param {import('../../types').Language.Options=} options
   */
  constructor(options) {
    super();
    this.supportedLanguages = options?.supportedLanguages ?? SUPPORTED_LANGUAGES;
    this.language = options?.language;
    this.getLanguageKey = options?.getLanguageKey ?? this.getLanguageKey;
    this.excludedLayerIds = options?.excludedLayerIds ?? [];
    this.styleChangeListener = this.styleChangeListener.bind(this);
  }

  $onAdd() {
    this.map.on('styledata', this.styleChangeListener);
  }

  $onRemove() {
    this.map.off('styledata', this.styleChangeListener);
  }

  styleChangeListener() {
    this.map.off('styledata', this.styleChangeListener);
    this.setLanguage(this.language);
  }

  /**
   * @param {string=} lang
   */
  setLanguage(lang) {
    let language = lang || this.browserLanguage();
    if (this.supportedLanguages.indexOf(language) < 0) {
      language = 'mul';
    }
    const style = this.map.getStyle();
    if (!style.layers) return;
    const languageKey = this.getLanguageKey(language);
    const layers = style.layers.map((layer) => {
      if (layer.type !== 'symbol') return layer;
      if (!layer.layout || !layer.layout['text-field']) return layer;
      if (this.excludedLayerIds.indexOf(layer.id) !== -1) return layer;

      const textField = layer.layout['text-field'];
      const textFieldLocalized = this.localizeTextField(textField, languageKey);

      return {
        ...layer,
        layout: {
          ...layer.layout,
          'text-field': textFieldLocalized,
        },
      };
    });

    this.map.setStyle({ ...style, layers });
  }

  browserLanguage() {
    const language = navigator.languages ? navigator.languages[0] : navigator.language;
    const parts = language.split('-');
    const languageCode = parts.length > 1 ? parts[0] : language;
    if (this.supportedLanguages.indexOf(languageCode) > -1) return languageCode;

    return 'mul';
  }

  /**
   * @param {string} language
   */
  getLanguageKey(language) {
    if (language === 'mul') {
      return 'name';
    }

    return `name_${language}`;
  }

  /**
   * @param {import('../../types').Language.TextField} field
   * @param {string} languageKey
   * @returns {import('../../types').Language.TextField}
   */
  localizeTextField(field, languageKey) {
    // string
    if (typeof field === 'string') {
      return field.replace(/{name.*?}/, `{${languageKey}}`);
    }

    const str = JSON.stringify(field);

    // expression
    if (Array.isArray(field)) {
      return JSON.parse(str.replace(
        /"coalesce",\["get","name.*?"]/g,
        `"coalesce",["get","${languageKey}"]`,
      ));
    }

    // style function
    return JSON.parse(str.replace(/{name.*?}/g, `{${languageKey}}`));
  }
}
