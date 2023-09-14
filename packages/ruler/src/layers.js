/** @type {import('mapbox-gl').LineLayer & { source: string }} */
export const lineLayer = {
	id: 'mapbox-control-ruler-line',
	type: 'line',
	source: 'mapbox-control-ruler-lines',
	layout: {},
	paint: {
		'line-color': '#263238',
		'line-width': 2,
	},
};

/** @type {import('mapbox-gl').SymbolLayer & { source: string }} */
export const symbolLayer = {
	id: 'mapbox-control-ruler-symbol',
	type: 'symbol',
	source: 'mapbox-control-ruler-points',
	layout: {
		'text-field': '{text}',
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
};
