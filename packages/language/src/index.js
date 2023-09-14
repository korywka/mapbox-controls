/** @typedef {import('mapbox-gl').StyleFunction} StyleFunction */
/** @typedef {import('mapbox-gl').Expression} Expression */
/** @typedef {string | StyleFunction | Expression} TextField */

/**
 * @typedef {{
 * 	supportedLanguages?: string[]
 * 	language?: string
 * 	getLanguageKey?: (language: string) => string
 * 	excludedLayerIds?: string[]
 * }} LanguageControlOptions
 */

const defaults = {
	// Supported languages: https://docs.mapbox.com/help/troubleshooting/change-language/
	supportedLanguages: ['en', 'es', 'fr', 'de', 'ru', 'zh', 'pt', 'ar', 'ja', 'ko', 'mul'],
	getLanguageKey: (/** @type {string} */ language) => (language === 'mul' ? 'name' : `name_${language}`),
	excludedLayerIds: [],
};

export default class LanguageControl {
	/** @param {LanguageControlOptions} options */
	constructor(options = {}) {
		this.options = { ...defaults, ...options };
		this.container = document.createElement('div');
	}

	styleChangeListener = () => {
		if (!this.map) throw Error('map is undefined');
		this.map.off('styledata', this.styleChangeListener);
		this.setLanguage(this.options.language);
	};

	/** @param {string=} lang */
	setLanguage(lang) {
		if (!this.map) throw Error('map is undefined');
		let language = lang || this.browserLanguage();
		if (this.options.supportedLanguages.indexOf(language) < 0) {
			language = 'mul';
		}
		const style = this.map.getStyle();
		if (!style.layers) return;
		const languageKey = this.options.getLanguageKey(language);
		const layers = style.layers.map((layer) => {
			if (layer.type !== 'symbol') return layer;
			if (!layer.layout || !layer.layout['text-field']) return layer;
			if (this.options.excludedLayerIds.indexOf(layer.id) !== -1) return layer;

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
		const language = navigator?.languages[0] ?? navigator.language;
		const parts = language.split('-');
		const languageCode = parts.length > 1 ? parts[0] : language;
		if (this.options.supportedLanguages.indexOf(languageCode) > -1) return languageCode;

		return 'mul';
	}

	/**
   * @param {TextField} field
   * @param {string} languageKey
   * @returns {TextField}
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

	/**
	 * @param {import('mapbox-gl').Map} map
	 * @returns {HTMLElement}
	 */
	onAdd(map) {
		this.map = map;
		this.map.on('styledata', this.styleChangeListener);
		return this.container;
	}

	onRemove() {
		this.map?.off('styledata', this.styleChangeListener);
		this.container.parentNode?.removeChild(this.container);
	}
}
