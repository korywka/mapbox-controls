import { controlContainer, controlButton } from '@mapbox-controls/helpers';
import { icons } from './icons.js';
import { layers } from './layers.js';
import { sources, toGeoJSONLine, toGeoJSONPoints } from './sources.js';

export default class RulerControl {
	/**
   * @param {import('./types').ControlOptions} options
   */
	constructor(options = {}) {
		this.options = options;
		this.container = controlContainer('mapbox-ctrl-ruler');
		this.isActive = false;
		/** @type {[number, number][]} */
		this.coordinates = [];
		/** @type {HTMLButtonElement | null} */
		this.button = null;
		/** @type {(() => void) | null} */
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
		// @ts-ignore
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
		// @ts-ignore
		this.map.fire('ruler.off');
		if (this.button) {
			this.button.classList.remove('-active');
		}
	}

	/**
   * @param {import('mapbox-gl').MapMouseEvent} event
   */
	mapClickListener = (event) => {
		if (!this.map) throw Error('map is undefined');
		this.addCoordinate([event.lngLat.lng, event.lngLat.lat]);
	};

	/**
	 * @param {[number, number]} coordinate - [lng, lat] of new point
	 */
	addCoordinate(coordinate) {
		if (!this.map) throw Error('map is undefined');
		if (!this.isActive) throw Error('ruler is not active');
		this.coordinates.push(coordinate);
		this.updateSource();
	}

	updateSource() {
		if (!this.map) throw Error('map is undefined');
		// @ts-ignore
		this.map.fire('ruler.change', { coordinates: this.coordinates });
		const lineSource = /** @type {import('mapbox-gl').GeoJSONSource} */(this.map.getSource(sources.line));
		const pointsSource = /** @type {import('mapbox-gl').GeoJSONSource} */(this.map.getSource(sources.points));
		const geoJSONLine = toGeoJSONLine(this.coordinates);
		const geoJSONPoints = toGeoJSONPoints(this.coordinates, {
			units: this.options.units,
			labelFormat: this.options.labelFormat,
		});
		lineSource.setData(geoJSONLine);
		pointsSource.setData(geoJSONPoints);
	}

	addDragEvents() {
		/** @typedef {import('mapbox-gl').MapMouseEvent} MapMouseEvent */
		/** @typedef {import('mapbox-gl').MapTouchEvent} MapTouchEvent */
		/** @typedef {import('mapbox-gl').MapMouseEvent} MapLayerMouseEvent */
		/** @typedef {import('mapbox-gl').MapTouchEvent} MapLayerTouchEvent */
		if (!this.map) throw Error('map is undefined');
		const self = this;
		const map = this.map;
		const canvas = map.getCanvas();
		/** @type {number} */
		let markerIndex;

		function onMouseEnter() {
			canvas.style.cursor = 'move';
		}

		function onMouseLeave() {
			canvas.style.cursor = '';
		}

		/** @param {MapLayerMouseEvent | MapLayerTouchEvent} event */
		function onStart(event) {
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

		/** @param {MapMouseEvent | MapTouchEvent} event */
		function onMove(event) {
			const coords = event.lngLat;
			canvas.style.cursor = 'grabbing';
			self.coordinates[markerIndex] = [coords.lng, coords.lat];
			self.updateSource();
		}

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

	/**
	 * @param {import('mapbox-gl').Map} map
	 * @returns {HTMLElement}
	 */
	onAdd(map) {
		this.map = map;
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
