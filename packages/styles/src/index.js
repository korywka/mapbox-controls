import { controlButton, controlContainer } from '@mapbox-controls/helpers';
import { icons } from './icons.js';

const defaults = [
	{
		label: 'Standard',
		styleName: 'Mapbox Standard',
		styleUrl: 'mapbox://styles/mapbox/standard',
	}, {
		label: 'Satellite',
		styleName: 'Mapbox Satellite Streets',
		styleUrl: 'mapbox://styles/mapbox/satellite-streets-v12',
	},
];

export default class StylesControl {
	/** @param {import('./types').ControlOptions} options */
	constructor(options = {}) {
		this.options = { styles: defaults, ...options };
		this.container = controlContainer('mapbox-ctrl-styles');
		this.container.classList.add(options.compact ? 'mapbox-ctrl-styles-compact' : 'mapbox-ctrl-styles-expanded');
	}

	/** @param {string} name */
	findStyle(name) {
		const style = this.options.styles.find((s) => s.styleName === name);
		if (!style) throw Error(`can't find style with name ${name}`);
		return style;
	}

	getCurrentStyleName() {
		if (!this.map) throw Error('map is undefined');
		/** @type {string} */
		let name;
		/** @type {any} mapbox standard style doesn't return JSON Style object */
		const style = this.map.getStyle();
		if (Array.isArray(style.imports) && style.imports.length) {
			// mapbox standard style
			name = style.imports[0].data.name;
		} else {
			// classic style
			name = style.name;
		}
		if (!name) throw Error('style must have name');
		return name;
	}

	expanded() {
		if (!this.map) throw Error('map is undefined');
		/** @type HTMLButtonElement[] */
		const buttons = [];
		this.options.styles.forEach((style) => {
			const button = controlButton({
				title: style.label,
				textContent: style.label,
				onClick: () => {
					if (!this.map) throw Error('map is undefined');
					if (button.classList.contains('-active')) return;
					this.map.setStyle(style.styleUrl);
					if (this.options.onChange) this.options.onChange(style);
				},
			});
			buttons.push(button);
			this.container.appendChild(button);
		});

		this.map.on('styledata', () => {
			if (!this.map) throw Error('map is undefined');
			buttons.forEach((button) => {
				button.classList.remove('-active');
			});
			const styleNames = this.options.styles.map((style) => style.styleName);
			const currentStyleName = this.getCurrentStyleName();
			const currentStyleIndex = styleNames.indexOf(currentStyleName);
			if (currentStyleIndex !== -1) {
				const currentButton = buttons[currentStyleIndex];
				currentButton.classList.add('-active');
			}
		});
	}

	compact() {
		if (!this.map) throw Error('map is undefined');
		const button = controlButton({ title: 'Styles', icon: icons.layers() });
		const select = document.createElement('select');
		this.container.appendChild(button);
		button.appendChild(select);

		this.options.styles.forEach((style) => {
			const option = document.createElement('option');
			select.appendChild(option);
			option.textContent = style.label;
			option.value = style.styleName;
		});

		select.addEventListener('change', () => {
			if (!this.map) throw Error('map is undefined');
			const style = this.findStyle(select.value);
			this.map.setStyle(style.styleUrl);
			if (this.options.onChange) this.options.onChange(style);
		});

		this.map.on('styledata', () => {
			select.value = this.getCurrentStyleName();
		});
	}

	/**
	 * @param {import('mapbox-gl').Map} map
	 * @returns {HTMLElement}
	 */
	onAdd(map) {
		this.map = map;
		if (this.options.compact) {
			this.compact();
		} else {
			this.expanded();
		}
		return this.container;
	}

	onRemove() {
		this.container.parentNode?.removeChild(this.container);
	}
}
