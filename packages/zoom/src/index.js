import { controlButton, controlContainer } from '@mapbox-controls/helpers';
import { icons } from './icons.js';

class ZoomControl {
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

	/**
	 * @param {import('mapbox-gl').Map} map
	 * @returns {HTMLElement}
	 */
	onAdd(map) {
		this.map = map;
		this.container.appendChild(this.buttonIn);
		this.container.appendChild(this.buttonOut);
		return this.container;
	}

	onRemove() {
		this.container.parentNode?.removeChild(this.container);
	}
}

export default ZoomControl;
