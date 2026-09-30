import type { Map } from 'mapbox-gl';
import type { ControlOptions, TextField } from './types.js';
import { Control, isMapLibre } from '@mapbox-controls/helpers';

const languages = ['ar', 'de', 'en', 'es', 'fr', 'it', 'ja', 'ko', 'mul', 'pt', 'ru', 'vi', 'zh-Hans', 'zh-Hant'];

export default class LanguageControl extends Control<Map> {
	options: ControlOptions;

	constructor(options: ControlOptions = {}) {
		super();
		this.options = { ...options };
	}

	styleChangeListener = () => {
		this.map.off('styledata', this.styleChangeListener);
		this.setLanguage(this.options.language);
	};

	setLanguage(lang?: string) {
		let language = lang || this.browserLanguage();
		if (this.getSupportedLanguages().indexOf(language) < 0) {
			language = 'mul';
		}
		const style = this.map.getStyle();
		if (!style) return;
		const languageKey = this.getLanguageKey(language);
		style.layers.forEach((layer) => {
			if (layer.type !== 'symbol') return;
			if (!layer.layout || !layer.layout['text-field']) return;
			if (this.options.excludedLayerIds?.includes(layer.id)) return;
			const textField = layer.layout['text-field'];
			const textFieldLocalized = this.localizeTextField(textField, languageKey);
			this.map.setLayoutProperty(layer.id, 'text-field', textFieldLocalized);
		});
	}

	getSupportedLanguages() {
		return this.options.supportedLanguages ?? languages;
	}

	getLanguageKey(language: string) {
		const defaultLanguageKey = (language: string) => {
			if (language === 'mul') return 'name';
			return isMapLibre(this.map) ? `name:${language}` : `name_${language}`;
		};
		return (this.options.getLanguageKey ?? defaultLanguageKey)(language);
	}

	browserLanguage() {
		const language = navigator?.languages[0] ?? navigator.language;
		const parts = language.split('-');
		const languageCode = parts.length > 1 ? parts[0] : language;
		if (this.getSupportedLanguages().indexOf(languageCode) > -1) return languageCode;
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

	protected mount() {
		this.map.on('styledata', this.styleChangeListener);
	}

	protected unmount() {
		this.map.off('styledata', this.styleChangeListener);
	}
}
