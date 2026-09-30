import type { IControl, Map } from 'mapbox-gl';
import type { ControlOptions } from './types.js';
import { controlContainer, controlButton } from '@mapbox-controls/helpers';
import { icons } from './icons.js';

class CompassControl implements IControl {
	options: ControlOptions;
	container: HTMLDivElement;
	icon: SVGElement;
	button: HTMLButtonElement;
	map: Map | undefined;

	constructor(options: ControlOptions = {}) {
		this.options = { ...options };
		this.container = controlContainer('mapbox-ctrl-compass');
		this.icon = icons.compass();
		this.button = controlButton({
			title: 'Compass',
			icon: this.icon,
			onClick: () => this.onControlButtonClick(),
		});
	}

	onControlButtonClick() {
		if (!this.map) throw Error('map is undefined');
		this.map.easeTo({ bearing: 0, pitch: 0 });
	}

	onRotate() {
		if (!this.map) throw Error('map is undefined');
		const angle = this.map.getBearing() * -1;
		if (!this.options.instant) {
			this.container.hidden = angle === 0;
		}
		this.icon.style.rotate = `${angle}deg`;
	}

	onAdd(map: unknown): HTMLElement {
		this.map = map as Map;
		if (!this.options.instant) {
			this.container.hidden = true;
		}
		this.container.appendChild(this.button);
		this.onRotate();
		this.map.on('rotate', () => this.onRotate());
		return this.container;
	}

	onRemove() {
		this.container.parentNode?.removeChild(this.container);
	}
}

export default CompassControl;
