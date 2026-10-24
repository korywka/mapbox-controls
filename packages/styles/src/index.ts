import type { Map } from 'mapbox-gl';
import type { MapLibreMap } from 'maplibre-gl';
import type { ControlOptions, Style } from './types.js';
import { Control, controlButton, isMapLibre } from '@mapbox-controls/helpers';
import { icons } from './icons.js';

export type { ControlOptions, Style } from './types.js';

export default class StylesControl extends Control<Map> {
	options: ControlOptions;
	selected: Style | undefined;
	render: () => void;

	constructor(options: ControlOptions) {
		super('mapgl-styles');
		this.options = { ...options };
		this.container.classList.add(options.compact ? 'mapgl-styles-compact' : 'mapgl-styles-expanded');
		this.render = options.compact ? this.compact() : this.expanded();
	}

	get styles() {
		return this.options.styles;
	}

	select(style: Style) {
		if (style === this.selected) return;
		this.selected = style;
		this.render();
		this.map.setStyle(style.style, { diff: false } as Parameters<Map['setStyle']>[1]);
		if (this.options.onChange) this.options.onChange(style);
	}

	expanded() {
		const buttons: HTMLButtonElement[] = [];
		this.styles.forEach((style) => {
			const button = controlButton({
				title: style.label,
				textContent: style.label,
				onClick: () => this.select(style),
			});
			buttons.push(button);
			this.container.appendChild(button);
		});

		return () => {
			buttons.forEach((button, index) => {
				button.classList.toggle('-active', this.styles[index] === this.selected);
			});
		};
	}

	compact() {
		const button = controlButton({ title: 'Styles', icon: icons.layers() });
		const select = document.createElement('select');
		this.container.appendChild(button);
		button.appendChild(select);

		this.styles.forEach((style, index) => {
			const option = document.createElement('option');
			select.appendChild(option);
			option.textContent = style.label;
			option.value = String(index);
		});

		select.addEventListener('change', () => {
			this.select(this.styles[Number(select.value)]);
		});

		return () => {
			select.value = String(this.styles.findIndex((style) => style === this.selected));
		};
	}

	detect = () => {
		const url = currentStyleUrl(this.map)?.split('?')[0];
		const name = this.map.style?.stylesheet?.name;
		this.selected = this.styles.find(({ style }) =>
			typeof style === 'string' ? style.split('?')[0] === url : style.name === name,
		);
		this.render();
	};

	protected mount() {
		this.detect();
		this.map.on('styledata', this.detect);
	}

	protected unmount() {
		this.map.off('styledata', this.detect);
	}
}

/**
 * URL of the map style
 */
function currentStyleUrl(map: Map) {
	if (isMapLibre(map)) {
		return (map as unknown as MapLibreMap).getStyleUrl?.();
	}
	return map.style?.globalId;
}
