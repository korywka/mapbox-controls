import mapboxgl from 'mapbox-gl';
import { controlContainer, controlButton } from '@mapbox-controls/helpers';
import { icons } from './icons.js';
import distance from '@turf/distance';
import { labelFormat } from './label-format.js';
import { lineLayer, symbolLayer } from './layers.js';

/**
 * @typedef {import('@turf/helpers').Units} Units
 * @typedef {{
 *  units?: Units
 *  labelFormat?: (n: number) => string
 *  symbolLayout?: import('mapbox-gl').SymbolLayout
 *  symbolPaint?: import('mapbox-gl').SymbolPaint
 *  lineLayout?: import('mapbox-gl').LineLayout
 *  linePaint?: import('mapbox-gl').LinePaint
 *  markerCSS?: Partial<CSSStyleDeclaration>
 * 	invisible?: boolean
 * }} RulerControlOptions
 */

/**
 * @type {{
 * 	units: Units
 *  labelFormat: (n: number) => string
 * }}
 */
const defaults = {
	units: 'kilometers',
	labelFormat,
};

export default class RulerControl {
	/**
   * @param {RulerControlOptions} options
   */
	constructor(options = {}) {
		this.options = { ...defaults, ...options };
		this.container = controlContainer('mapbox-ctrl-ruler');
		this.isActive = false;
		/** @type {[number, number][]} */
		this.coordinates = [];
		/** @type {import('mapbox-gl').Marker[]} */
		this.markers = [];
		/** @type {HTMLButtonElement | null} */
		this.button = null;
		if (!this.options.invisible) {
			this.button = controlButton({
				title: 'Ruler',
				icon: icons.ruler,
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

		this.map.addSource(lineLayer.source, {
			type: 'geojson',
			data: this.asLine(),
		});

		this.map.addSource(symbolLayer.source, {
			type: 'geojson',
			data: this.asPoints(),
		});

		this.map.addLayer({
			...lineLayer,
			layout: {
				...lineLayer.layout,
				...this.options.lineLayout,
			},
			paint: {
				...lineLayer.paint,
				...this.options.linePaint,
			},
		});

		this.map.addLayer({
			...symbolLayer,
			layout: {
				...symbolLayer.layout,
				...this.options.symbolLayout,
			},
			paint: {
				...symbolLayer.paint,
				...this.options.symbolPaint,
			},
		});
	};

	activate() {
		if (!this.map) throw Error('map is undefined');
		this.isActive = true;
		this.markers = [];
		this.coordinates = [];
		this.map.getCanvas().style.cursor = 'crosshair';
		this.draw();
		this.map.on('click', this.mapClickListener);
		this.map.on('style.load', this.draw);
		this.map.fire('ruler.on');
		if (this.button) {
			this.button.classList.add('-active');
		}
	}

	deactivate() {
		if (!this.map) throw Error('map is undefined');
		this.isActive = false;
		this.map.getCanvas().style.cursor = '';
		// remove layers, sources and event listeners
		this.map.removeLayer(lineLayer.id);
		this.map.removeLayer(symbolLayer.id);
		this.map.removeSource(lineLayer.source);
		this.map.removeSource(symbolLayer.source);
		this.markers.forEach((m) => m.remove());
		this.map.off('click', this.mapClickListener);
		this.map.off('style.load', this.draw);
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
		const markerElement = this.newMarkerElement();
		const marker = new mapboxgl.Marker({ element: markerElement, draggable: true })
			.setLngLat(coordinate)
			.addTo(this.map);
		this.markers.push(marker);
		this.updateSource();
		const markerIndex = this.markers.length - 1;
		marker.on('drag', () => {
			const lngLat = marker.getLngLat();
			this.coordinates[markerIndex] = [lngLat.lng, lngLat.lat];
			this.updateSource();
		});
	}

	updateSource() {
		if (!this.map) throw Error('map is undefined');
		this.map.fire('ruler.change', { coordinates: this.coordinates });
		const lineSource = /** @type {import('mapbox-gl').GeoJSONSource} */(this.map.getSource(lineLayer.source));
		const symbolSource = /** @type {import('mapbox-gl').GeoJSONSource} */(this.map.getSource(symbolLayer.source));
		lineSource.setData(this.asLine());
		symbolSource.setData(this.asPoints());
	}

	newMarkerElement() {
		const node = document.createElement('div');
		node.style.width = '12px';
		node.style.height = '12px';
		node.style.borderRadius = '50%';
		node.style.background = '#fff';
		node.style.boxSizing = 'border-box';
		node.style.border = '2px solid #263238';

		if (this.options.markerCSS) {
			Object.entries(this.options.markerCSS).forEach(([key, value]) => {
				node.style.setProperty(key, String(value));
			});
		}

		return node;
	}

	/**
   * @returns {import('geojson').Feature<import('geojson').LineString>}
   */
	asLine() {
		return {
			type: 'Feature',
			properties: {},
			geometry: {
				type: 'LineString',
				coordinates: this.coordinates,
			},
		};
	}

	/**
   * @returns {import('geojson').FeatureCollection<import('geojson').Point>}
   */
	asPoints() {
		let sum = 0;
		return {
			type: 'FeatureCollection',
			features: this.coordinates.map((coordinate, index) => {
				if (index > 0) {
					sum += distance(this.coordinates[index - 1], coordinate, { units: this.options.units });
				}
				return {
					type: 'Feature',
					properties: {
						text: this.options.labelFormat(sum),
					},
					geometry: {
						type: 'Point',
						coordinates: coordinate,
					},
				};
			}),
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
		return this.container;
	}

	onRemove() {
		if (this.isActive) this.deactivate();
		this.map?.off('click', this.mapClickListener);
		this.container.parentNode?.removeChild(this.container);
	}
}
