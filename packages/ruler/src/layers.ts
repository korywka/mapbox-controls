import type { CircleLayerSpecification, LineLayerSpecification, SymbolLayerSpecification } from 'mapbox-gl';
import { sources } from './sources.js';

export interface Layers {
	line: LineLayerSpecification;
	markers: CircleLayerSpecification;
	labels: SymbolLayerSpecification;
}

export const layers: Layers = {
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
			'text-field': '{distance}',
			'text-font': ['Roboto Medium'],
			'text-anchor': 'top',
			'text-size': 12,
			'text-offset': [0, 0.8],
		},
		paint: {
			'text-color': '#263238',
			'text-halo-color': '#fff',
			'text-halo-width': 1,
		},
	},
};
