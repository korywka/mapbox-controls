import type { GeoJSONSource, IControl, Map, MapMouseEvent, MapTouchEvent } from 'mapbox-gl';
import { controlContainer, controlButton } from '@mapbox-controls/helpers';
import { icons } from './icons.js';
import { layers } from './layers.js';
import { sources, toGeoJSONLine, toGeoJSONPoints } from './sources.js';
import type { ControlOptions } from './types.js';

export default class RulerControl implements IControl {
	options: ControlOptions;
	container: HTMLDivElement;
	isActive: boolean;
	coordinates: [number, number][];
	button: HTMLButtonElement | null;
	removeDragEvents: (() => void) | null;
	map: Map | undefined;

	constructor(options: ControlOptions = {}) {
		this.options = options;
		this.container = controlContainer('mapbox-ctrl-ruler');
		this.isActive = false;
		this.coordinates = [];
		this.button = null;
		this.removeDragEvents = null;
		if (!this.options.invisible) {
			this.button = controlButton({
				title: 'Ruler',
				icon: icons.ruler(),
				onClick: () => this.onControlButtonClick(),
			});
		}
	}

	onControlButtonClick() {
		if (this.isActive) {
			this.deactivate();
		} else {
			this.activate();
		}
	}

	draw = () => {
		if (!this.map) throw Error('map is undefined');

		this.map.addSource(sources.line, {
			type: 'geojson',
			data: toGeoJSONLine(this.coordinates),
		});

		this.map.addSource(sources.points, {
			type: 'geojson',
			data: toGeoJSONPoints(this.coordinates, {
				units: this.options.units,
				labelFormat: this.options.labelFormat,
			}),
		});

		this.map.addLayer({
			...layers.line,
			layout: {
				...layers.line.layout,
				...this.options.lineLayout,
			},
			paint: {
				...layers.line.paint,
				...this.options.linePaint,
			},
		});

		this.map.addLayer({
			...layers.markers,
			layout: {
				...layers.markers.layout,
				...this.options.markerLayout,
			},
			paint: {
				...layers.markers.paint,
				...this.options.markerPaint,
			},
		});

		this.map.addLayer({
			...layers.labels,
			layout: {
				...layers.labels.layout,
				...this.options.labelLayout,
			},
			paint: {
				...layers.labels.paint,
				...this.options.labelPaint,
			},
		});
	};

	activate() {
		if (!this.map) throw Error('map is undefined');
		const map = this.map;
		this.isActive = true;
		this.coordinates = [];
		map.getCanvas().style.cursor = 'crosshair';
		this.draw();
		map.on('click', this.mapClickListener);
		map.on('style.load', this.draw);
		map.fire('ruler.on');
		if (this.button) {
			this.button.classList.add('-active');
		}
	}

	deactivate() {
		if (!this.map) throw Error('map is undefined');
		this.isActive = false;
		this.map.getCanvas().style.cursor = '';
		// remove layers, sources and event listeners
		this.map.removeLayer(layers.line.id);
		this.map.removeLayer(layers.markers.id);
		this.map.removeLayer(layers.labels.id);
		this.map.removeSource(sources.line);
		this.map.removeSource(sources.points);
		this.map.off('click', this.mapClickListener);
		this.map.off('style.load', this.draw);
		this.map.fire('ruler.off');
		if (this.button) {
			this.button.classList.remove('-active');
		}
	}

	mapClickListener = (event: MapMouseEvent) => {
		if (!this.map) throw Error('map is undefined');
		this.addCoordinate([event.lngLat.lng, event.lngLat.lat]);
	};

	/**
	 * @param coordinate - [lng, lat] of new point
	 */
	addCoordinate(coordinate: [number, number]) {
		if (!this.map) throw Error('map is undefined');
		if (!this.isActive) throw Error('ruler is not active');
		this.coordinates.push(coordinate);
		this.updateSource();
	}

	updateSource() {
		if (!this.map) throw Error('map is undefined');
		this.map.fire('ruler.change', { coordinates: this.coordinates });
		const lineSource = this.map.getSource(sources.line) as GeoJSONSource;
		const pointsSource = this.map.getSource(sources.points) as GeoJSONSource;
		const geoJSONLine = toGeoJSONLine(this.coordinates);
		const geoJSONPoints = toGeoJSONPoints(this.coordinates, {
			units: this.options.units,
			labelFormat: this.options.labelFormat,
		});
		lineSource.setData(geoJSONLine);
		pointsSource.setData(geoJSONPoints);
	}

	addDragEvents() {
		if (!this.map) throw Error('map is undefined');
		const map = this.map;
		const canvas = map.getCanvas();
		let markerIndex: number;

		function onMouseEnter() {
			canvas.style.cursor = 'move';
		}

		function onMouseLeave() {
			canvas.style.cursor = '';
		}

		function onStart(event: MapMouseEvent | MapTouchEvent) {
			// do not block multi-touch actions
			if (event.type === 'touchstart' && event.points.length !== 1) {
				return;
			}
			event.preventDefault();
			const features = event.features;
			if (!features) return;
			markerIndex = Number(features[0].id);
			canvas.style.cursor = 'grabbing';
			// mouse events
			map.on('mousemove', onMove);
			map.on('mouseup', onEnd);
			// touch events
			map.on('touchmove', onMove);
			map.on('touchend', onEnd);
		}

		const onMove = (event: MapMouseEvent | MapTouchEvent) => {
			const coords = event.lngLat;
			canvas.style.cursor = 'grabbing';
			this.coordinates[markerIndex] = [coords.lng, coords.lat];
			this.updateSource();
		};

		function onEnd() {
			// mouse events
			map.off('mousemove', onMove);
			map.off('mouseup', onEnd);
			// touch events
			map.off('touchmove', onMove);
			map.off('touchend', onEnd);
		}

		// mouse events
		map.on('mouseenter', layers.markers.id, onMouseEnter);
		map.on('mouseleave', layers.markers.id, onMouseLeave);
		map.on('mousedown', layers.markers.id, onStart);
		// touch events
		map.on('touchstart', layers.markers.id, onStart);

		this.removeDragEvents = () => {
			// mouse events
			map.off('mousedown', layers.markers.id, onStart);
			map.off('mousemove', onMove);
			map.off('mouseup', onEnd);
			map.off('mouseenter', layers.markers.id, onMouseEnter);
			map.off('mouseleave', layers.markers.id, onMouseLeave);
			// touch events
			map.off('touchstart', layers.markers.id, onStart);
			map.off('touchmove', onMove);
			map.off('touchend', onEnd);
		};
	}

	onAdd(map: unknown): HTMLElement {
		this.map = map as Map;
		if (this.button) {
			this.container.appendChild(this.button);
		}
		this.addDragEvents();
		return this.container;
	}

	onRemove() {
		if (this.isActive) {
			this.deactivate();
		}
		if (this.removeDragEvents) {
			this.removeDragEvents();
		}
		this.container.parentNode?.removeChild(this.container);
	}
}
