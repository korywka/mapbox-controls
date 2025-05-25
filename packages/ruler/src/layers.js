import { sources } from './sources.js';

/**
 * @typedef {{
 *  line: import('mapbox-gl').LineLayerSpecification
 *  markers: import('mapbox-gl').CircleLayerSpecification
 *  labels: import('mapbox-gl').SymbolLayerSpecification
 * }} Layers
 */

/** @type {Layers} */
export const layers = {
	line: {
		id: 'mapbox-control-ruler-line',
		type: 'line',
		source: sources.line,
		layout: {},
		paint: {
			'line-color': '#263238',
			'line-width': 2,
		},
	},
	markers: {
		id: 'mapbox-control-ruler-markers',
		type: 'circle',
		filter: ['has', 'distance'],
		source: sources.points,
		paint: {
			'circle-radius': 5,
			'circle-color': '#fff',
			'circle-stroke-width': 2,
			'circle-stroke-color': '#000',
		},
	},
	labels: {
		id: 'mapbox-control-ruler-labels',
		type: 'symbol',
		source: sources.points,
		layout: {
			'text-field': ['concat', ['get', 'distance'], ['get', 'area']],
			'text-font': [
				'case',
				['has', 'area'],
				['literal', ['Roboto Bold']],
				['literal', ['Roboto Medium']],
			],
			'text-size': [
				'case',
				['has', 'area'],
				16,
				12,
			],
			'text-offset': [0, 0.8],
			'text-anchor': 'top',
			'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
			'text-allow-overlap': true,
		},
		paint: {
			'text-color': '#263238',
			'text-halo-color': '#fff',
			'text-halo-width': [
				'case',
				['has', 'area'],
				3,
				1,
			],
		},
	},
};
