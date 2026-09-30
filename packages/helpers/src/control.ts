import { isMapLibre } from './detector.js';

export abstract class Control<MapGL extends { getContainer(): HTMLElement }> {
	protected readonly container: HTMLDivElement;
	#map: MapGL | undefined;
	#group: boolean;

	constructor(className?: string) {
		this.container = document.createElement('div');
		this.#group = className !== undefined;
		if (className) this.container.classList.add(className);
	}

	protected get map(): MapGL {
		if (!this.#map) throw Error('map is undefined');
		return this.#map;
	}

	onAdd(map: unknown): HTMLElement {
		this.#map = map as MapGL;
		if (this.#group) this.container.classList.add(...controlClasses(this.#map));
		this.mount();
		return this.container;
	}

	onRemove() {
		this.unmount();
		this.container.remove();
		this.#map = undefined;
	}

	protected mount() {}
	protected unmount() {}
}

/**
 * Control classes: maplibregl-ctrl for MapLibre or mapboxgl-ctrl for Mapbox
 */
function controlClasses(map: { getContainer(): HTMLElement }) {
	const prefix = isMapLibre(map) ? 'maplibregl' : 'mapboxgl';
	return [`${prefix}-ctrl`, `${prefix}-ctrl-group`];
}
