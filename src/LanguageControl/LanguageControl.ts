import getLanguageField from './getLanguageField';
import localizeTextField from './localizeTextField';
import Base from '../Base/Base';

const SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'de', 'ru', 'zh', 'pt', 'ar', 'ja', 'ko', 'mul'];

interface LanguageControlOptions {
  /** (supported languages)[https://docs.mapbox.com/help/troubleshooting/change-language/] */
  supportedLanguages?: string[]
  /** one of the supported languages to apply */
  language?: string
  /** Accepts language and returns language field. By default fields are `name_LANGUAGE` and `name` for multi language (mul) */
  getLanguageField?: (language: string) => string
  /** Array of layer id to exclude from localization */
  excludedLayerIds?: string[]
}

export default class LanguageControl extends Base {
  supportedLanguages: string[]
  language: string
  getLanguageField: (language: string) => string
  excludedLayerIds: string[]

  constructor(options?: LanguageControlOptions) {
    super();
    this.supportedLanguages = options?.supportedLanguages ?? SUPPORTED_LANGUAGES;
    this.language = options?.language;
    this.getLanguageField = options?.getLanguageField ?? getLanguageField;
    this.excludedLayerIds = options?.excludedLayerIds ?? [];
    this.styleChangeListener = this.styleChangeListener.bind(this);
  }

  onAddControl() {
    this.map.on('styledata', this.styleChangeListener);
  }

  onRemoveControl() {
    this.map.off('styledata', this.styleChangeListener);
  }

  styleChangeListener() {
    this.map.off('styledata', this.styleChangeListener);
    this.setLanguage(this.language);
  }

  setLanguage(lang = this.browserLanguage()) {
    const language = this.supportedLanguages.indexOf(lang) < 0 ? 'mul' : lang;
    const style = this.map.getStyle();
    const languageField = this.getLanguageField(language);
    const layers = style.layers.map((layer) => {
      if (layer.type !== 'symbol') return layer;
      if (!layer.layout || !layer.layout['text-field']) return layer;
      if (this.excludedLayerIds.indexOf(layer.id) !== -1) return layer;

      const textField = layer.layout['text-field'];
      const textFieldLocalized = localizeTextField(textField, languageField);

      return {
        ...layer,
        layout: { ...layer.layout, 'text-field': textFieldLocalized },
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
}
