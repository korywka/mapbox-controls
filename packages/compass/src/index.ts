import type { Map } from 'mapbox-gl';
import type { ControlOptions } from './types.js';
import { Control, controlButton } from '@mapbox-controls/helpers';
import { icons } from './icons.js';

export class CompassControl extends Control<Map> {
	options: ControlOptions;
	icon: SVGElement;
	button: HTMLButtonElement;

	constructor(options: ControlOptions = {}) {
		super('mapgl-compass');
		this.options = { ...options };
		this.icon = icons.compass();
		this.button = controlButton({
			title: 'Compass',
			icon: this.icon,
			onClick: () => this.onControlButtonClick(),
		});
	}

	onControlButtonClick() {
		this.map.easeTo({ bearing: 0, pitch: 0 });
	}

	onRotate = () => {
		const angle = this.map.getBearing() * -1;
		if (!this.options.instant) {
			this.container.hidden = angle === 0;
		}
		this.icon.style.rotate = `${angle}deg`;
	};

	protected mount() {
		if (!this.options.instant) {
			this.container.hidden = true;
		}
		this.container.appendChild(this.button);
		this.onRotate();
		this.map.on('rotate', this.onRotate);
	}

	protected unmount() {
		this.map.off('rotate', this.onRotate);
	}
}

export default CompassControl;
