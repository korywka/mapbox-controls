import type { IControl, Map } from 'mapbox-gl';
import type { ControlOptions, TextField } from './types.js';

const defaults = {
	supportedLanguages: ['ar', 'de', 'en', 'es', 'fr', 'it', 'ja', 'ko', 'mul', 'pt', 'ru', 'vi', 'zh-Hans', 'zh-Hant'],
	getLanguageKey: (language: string) => (language === 'mul' ? 'name' : `name_${language}`),
	excludedLayerIds: [] as string[],
};

export default class LanguageControl implements IControl {
	options: typeof defaults & ControlOptions;
	container: HTMLDivElement;
	map: Map | undefined;

	constructor(options: ControlOptions = {}) {
		this.options = { ...defaults, ...options };
		this.container = document.createElement('div');
	}

	styleChangeListener = () => {
		if (!this.map) throw Error('map is undefined');
		this.map.off('styledata', this.styleChangeListener);
		this.setLanguage(this.options.language);
	};

	setLanguage(lang?: string) {
		if (!this.map) throw Error('map is undefined');
		let language = lang || this.browserLanguage();
		if (this.options.supportedLanguages.indexOf(language) < 0) {
			language = 'mul';
		}
		const style = this.map.getStyle();
		if (!style) return;
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

	localizeTextField(field: TextField, languageKey: string): TextField {
		// string
		if (typeof field === 'string') {
			return field.replace(/{name.*?}/, `{${languageKey}}`);
		}

		const str = JSON.stringify(field);

		// expression
		if (Array.isArray(field)) {
			return JSON.parse(str.replace(/"coalesce",\["get","name.*?"]/g, `"coalesce",["get","${languageKey}"]`));
		}

		// style function
		return JSON.parse(str.replace(/{name.*?}/g, `{${languageKey}}`));
	}

	onAdd(map: unknown): HTMLElement {
		this.map = map as Map;
		this.map.on('styledata', this.styleChangeListener);
		return this.container;
	}

	onRemove() {
		this.map?.off('styledata', this.styleChangeListener);
		this.container.parentNode?.removeChild(this.container);
	}
}
