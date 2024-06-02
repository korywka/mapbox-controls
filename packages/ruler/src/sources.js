import distance from '@turf/distance';

/** @param {number} value */
function defaultLabelFormat(value) {
	return value < 1
		? `${(value * 1000).toFixed()} m`
		: `${value.toFixed(2)} km`;
}

export const sources = {
	line: 'mapbox-control-ruler-lines',
	points: 'mapbox-control-ruler-points',
};

/**
 * @param {[number, number][]} coordinates
 * @returns {import('geojson').Feature<import('geojson').LineString>}
 */
export function toGeoJSONLine(coordinates) {
	return {
		type: 'Feature',
		properties: {},
		geometry: {
			type: 'LineString',
			coordinates,
		},
	};
}

/**
 * @param {[number, number][]} coordinates
 * @param {{
 *  units?: import('@turf/helpers').Units,
 *  labelFormat?: (v: number) => string
 * }} options
 * @returns {import('geojson').FeatureCollection<import('geojson').Point>}
 */
export function toGeoJSONPoints(coordinates, options = {}) {
	const labelFormat = options.labelFormat ?? defaultLabelFormat;
	const units = options.units ?? 'kilometers';
	let sum = 0;
	return {
		type: 'FeatureCollection',
		features: coordinates.map((coordinate, index) => {
			if (index > 0) {
				sum += distance(coordinates[index - 1], coordinate, { units });
			}
			return {
				type: 'Feature',
				id: String(index),
				properties: {
					distance: labelFormat(sum),
				},
				geometry: {
					type: 'Point',
					coordinates: coordinate,
				},
			};
		}),
	};
}
