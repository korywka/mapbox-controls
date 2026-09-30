import type { GeoJSONFeature, IControl, LngLat, Map, MapMouseEvent, Point } from 'mapbox-gl';
import type { ControlOptions } from './types.js';
import { controlButton, controlContainer } from '@mapbox-controls/helpers';
import { icons } from './icons.js';
import { popup } from './popup.js';

export default class InspectControl implements IControl {
	options: ControlOptions;
	container: HTMLDivElement;
	button: HTMLButtonElement;
	isActive: boolean;
	detailsNode: HTMLDivElement | undefined;
	lngLat: LngLat | undefined;
	map: Map | undefined;

	constructor(options: ControlOptions = {}) {
		this.options = { ...options };
		this.container = controlContainer('mapbox-ctrl-inspect');
		this.button = controlButton({
			title: 'Inspect',
			icon: icons.inspect(),
			onClick: () => this.onControlButtonClick(),
		});
		this.isActive = false;
	}

	onControlButtonClick() {
		if (this.isActive) {
			this.deactivate();
		} else {
			this.activate();
		}
	}

	activate() {
		if (!this.map) throw Error('map is undefined');
		this.isActive = true;
		this.button.classList.add('-active');
		this.map.on('click', this.mapClickListener);
		this.map.on('move', this.updatePosition);
		this.map.getCanvas().style.cursor = 'pointer';
	}

	deactivate() {
		if (!this.map) throw Error('map is undefined');
		this.isActive = false;
		this.button.classList.remove('-active');
		this.map.off('click', this.mapClickListener);
		this.map.off('move', this.updatePosition);
		this.map.getCanvas().style.cursor = '';
		this.hideDetails();
	}

	getPointFeatures(point: Point) {
		if (!this.map) throw Error('map is undefined');
		const selectThreshold = 3;

		const queryBox: [[number, number], [number, number]] = [
			[point.x - selectThreshold, point.y + selectThreshold], // bottom left (SW)
			[point.x + selectThreshold, point.y - selectThreshold], // top right (NE)
		];

		return this.map.queryRenderedFeatures(queryBox);
	}

	showDetails(features: GeoJSONFeature[]) {
		if (!this.map) throw Error('map is undefined');
		this.detailsNode = popup(features);
		this.map.getContainer().appendChild(this.detailsNode);
		this.updatePosition();
		if (this.options.console) {
			console.log(features);
		}
	}

	hideDetails() {
		if (!this.map) throw Error('map is undefined');
		if (!this.detailsNode) return;
		this.map.getContainer().removeChild(this.detailsNode);
		this.detailsNode = undefined;
	}

	updatePosition = () => {
		if (!this.map) throw Error('map is undefined');
		if (!this.lngLat) return;
		if (!this.detailsNode) return;
		const canvasRect = this.map.getCanvas().getBoundingClientRect();
		const pos = this.map.project(this.lngLat);
		this.detailsNode.style.left = `${pos.x - canvasRect.left}px`;
		this.detailsNode.style.top = `${pos.y - canvasRect.top}px`;
	};

	mapClickListener = (event: MapMouseEvent) => {
		this.lngLat = event.lngLat;
		const features = this.getPointFeatures(event.point);
		this.hideDetails();
		this.showDetails(features);
	};

	onAdd(map: unknown): HTMLElement {
		this.map = map as Map;
		this.container.appendChild(this.button);
		return this.container;
	}

	onRemove() {
		this.deactivate();
		this.container.parentNode?.removeChild(this.container);
	}
}
