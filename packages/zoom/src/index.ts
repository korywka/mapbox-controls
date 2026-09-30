import type { Map } from 'mapbox-gl';
import { Control, controlButton } from '@mapbox-controls/helpers';
import { icons } from './icons.js';

class ZoomControl extends Control<Map> {
	buttonIn: HTMLButtonElement;
	buttonOut: HTMLButtonElement;

	constructor() {
		super('mapgl-zoom');
		this.buttonIn = controlButton({
			title: 'Zoom In',
			icon: icons.plus(),
			onClick: () => this.map.zoomIn(),
		});
		this.buttonOut = controlButton({
			title: 'Zoom Out',
			icon: icons.minus(),
			onClick: () => this.map.zoomOut(),
		});
	}

	protected mount() {
		this.container.appendChild(this.buttonIn);
		this.container.appendChild(this.buttonOut);
	}
}

export default ZoomControl;
