import type { IControl, Map } from 'mapbox-gl';
import { controlButton, controlContainer } from '@mapbox-controls/helpers';
import { icons } from './icons.js';

class ZoomControl implements IControl {
	container: HTMLDivElement;
	buttonIn: HTMLButtonElement;
	buttonOut: HTMLButtonElement;
	map: Map | undefined;

	constructor() {
		this.container = controlContainer('mapbox-ctrl-zoom');
		this.buttonIn = controlButton({
			title: 'Zoom In',
			icon: icons.plus(),
			onClick: () => this.map?.zoomIn(),
		});
		this.buttonOut = controlButton({
			title: 'Zoom Out',
			icon: icons.minus(),
			onClick: () => this.map?.zoomOut(),
		});
	}

	onAdd(map: unknown): HTMLElement {
		this.map = map as Map;
		this.container.appendChild(this.buttonIn);
		this.container.appendChild(this.buttonOut);
		return this.container;
	}

	onRemove() {
		this.container.parentNode?.removeChild(this.container);
	}
}

export default ZoomControl;
