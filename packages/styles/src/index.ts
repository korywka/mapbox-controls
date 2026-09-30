import type { Map } from 'mapbox-gl';
import { Control, controlButton, isMapLibre } from '@mapbox-controls/helpers';
import { icons } from './icons.js';
import type { ControlOptions, Style } from './types.js';

const defaults: Style[] = [
	{
		label: 'Standard',
		styleName: 'Mapbox Standard',
		styleUrl: 'mapbox://styles/mapbox/standard',
	},
	{
		label: 'Satellite',
		styleName: 'Mapbox Satellite Streets',
		styleUrl: 'mapbox://styles/mapbox/satellite-streets-v12',
	},
];

export default class StylesControl extends Control<Map> {
	options: ControlOptions;
	styleDataListener: () => void;

	constructor(options: ControlOptions = {}) {
		super('mapgl-styles');
		this.options = { ...options };
		this.container.classList.add(options.compact ? 'mapgl-styles-compact' : 'mapgl-styles-expanded');
		this.styleDataListener = options.compact ? this.compact() : this.expanded();
	}

	get styles() {
		return this.options.styles ?? defaults;
	}

	findStyle(name: string) {
		const style = this.styles.find((s) => s.styleName === name);
		if (!style) throw Error(`can't find style with name ${name}`);
		return style;
	}

	getCurrentStyleName() {
		let name: string | undefined;
		const style = this.map.getStyle();
		if (Array.isArray(style.imports) && style.imports.length) {
			// mapbox standard style
			name = style.imports[0].data?.name;
		} else {
			// classic style
			name = style.name;
		}
		if (!name) throw Error('style must have name');
		return name;
	}

	expanded() {
		const buttons: HTMLButtonElement[] = [];
		this.styles.forEach((style) => {
			const button = controlButton({
				title: style.label,
				textContent: style.label,
				onClick: () => {
					if (button.classList.contains('-active')) return;
					this.map.setStyle(style.styleUrl);
					if (this.options.onChange) this.options.onChange(style);
				},
			});
			buttons.push(button);
			this.container.appendChild(button);
		});

		return () => {
			buttons.forEach((button) => {
				button.classList.remove('-active');
			});
			const styleNames = this.styles.map((style) => style.styleName);
			const currentStyleName = this.getCurrentStyleName();
			const currentStyleIndex = styleNames.indexOf(currentStyleName);
			if (currentStyleIndex !== -1) {
				const currentButton = buttons[currentStyleIndex];
				currentButton.classList.add('-active');
			}
		};
	}

	compact() {
		const button = controlButton({ title: 'Styles', icon: icons.layers() });
		const select = document.createElement('select');
		this.container.appendChild(button);
		button.appendChild(select);

		this.styles.forEach((style) => {
			const option = document.createElement('option');
			select.appendChild(option);
			option.textContent = style.label;
			option.value = style.styleName;
		});

		select.addEventListener('change', () => {
			const style = this.findStyle(select.value);
			this.map.setStyle(style.styleUrl);
			if (this.options.onChange) this.options.onChange(style);
		});

		return () => {
			select.value = this.getCurrentStyleName();
		};
	}

	protected mount() {
		if (!this.options.styles && isMapLibre(this.map)) {
			throw Error('styles option is required for MapLibre: default styles are Mapbox styles');
		}
		if (this.map.isStyleLoaded()) {
			this.styleDataListener();
		} else {
			this.map.once('idle', this.styleDataListener);
		}
		this.map.on('styledata', this.styleDataListener);
	}

	protected unmount() {
		this.map.off('idle', this.styleDataListener);
		this.map.off('styledata', this.styleDataListener);
	}
}
