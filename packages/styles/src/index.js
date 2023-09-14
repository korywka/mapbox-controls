import { controlButton, controlContainer } from '@mapbox-controls/helpers';
import { icons } from './icons.js';

/**
 * @typedef {{
 * 	label: string
 * 	styleName: string
 * 	styleUrl: string
 * }} Style
 *
 * @typedef {{
 * 	styles?: Style[]
 * 	onChange?: (style: Style) => void
 * 	compact?: boolean
 * }} StylesControlOptions
 */

const defaults = [
	{
		label: 'Streets',
		styleName: 'Mapbox Streets',
		styleUrl: 'mapbox://styles/mapbox/streets-v12',
	}, {
		label: 'Satellite',
		styleName: 'Mapbox Satellite Streets',
		styleUrl: 'mapbox://sprites/mapbox/satellite-streets-v12',
	},
];

export default class StylesControl {
	/** @param {StylesControlOptions} options */
	constructor(options = {}) {
		this.options = { styles: defaults, ...options };
		this.container = controlContainer('mapbox-ctrl-styles');
		this.container.classList.add(options.compact ? 'mapbox-ctrl-styles-compact' : 'mapbox-ctrl-styles-expanded');
	}

	/** @param {string} name */
	findStyleByName(name) {
		const style = this.options.styles.find((s) => s.styleName === name);
		if (!style) throw Error(`can't find style with name ${name}`);
		return style;
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
			const styleName = this.map.getStyle().name;
			if (!styleName) throw Error('style must have name');
			const currentStyleIndex = styleNames.indexOf(styleName);
			if (currentStyleIndex !== -1) {
				const currentButton = buttons[currentStyleIndex];
				currentButton.classList.add('-active');
			}
		});
	}

	compact() {
		if (!this.map) throw Error('map is undefined');
		const button = controlButton({ title: 'Styles', icon: icons.layers });
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
			const style = this.findStyleByName(select.value);
			this.map.setStyle(style.styleUrl);
			if (this.options.onChange) this.options.onChange(style);
		});

		this.map.on('styledata', () => {
			if (!this.map) throw Error('map is undefined');
			const styleName = this.map.getStyle().name;
			if (!styleName) throw Error('style must have name');
			select.value = styleName;
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
