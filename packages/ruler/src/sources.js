import area from '@turf/area';
import distance from '@turf/distance';
import pointOnFeature from '@turf/point-on-feature';
import { polygon } from '@turf/helpers';
import { defaultLabelAreaFormat, defaultLabelFormat } from './format.js';

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
 *  areaUnits?: import('@turf/helpers').AreaUnits,
 *  labelFormat?: (v: number, units?: import('@turf/helpers').Units) => string
 *  labelAreaFormat?: (v: number, units?: import('@turf/helpers').AreaUnits) => string
 *  showArea?: boolean,
 * }} options
 * @returns {import('geojson').FeatureCollection<import('geojson').Point>}
 */
export function toGeoJSONPoints(coordinates, options = {}) {
	const labelFormat = options.labelFormat ?? defaultLabelFormat;
	const distanceUnits = options.units ?? 'kilometers';
	let sumDist = 0;
	/** @type {import('geojson').FeatureCollection<import('geojson').Point>} */
	const pointsFeatureCollection = {
		type: ('FeatureCollection'),
		features: coordinates.map((coordinate, index) => {
			if (index > 0) {
				sumDist += distance(coordinates[index - 1], coordinate, { units: distanceUnits });
			}
			return {
				type: 'Feature',
				id: String(index),
				properties: {
					distance: labelFormat(sumDist, distanceUnits),
				},
				geometry: {
					type: 'Point',
					coordinates: coordinate,
				},
			};
		}),
	};

	if (options.showArea && coordinates.length > 2) {
		const first = coordinates[0];
		const closingDistance = distance(first, coordinates[coordinates.length - 1], { units: distanceUnits });
		if (closingDistance < (sumDist * 0.01)) {
			const labelAreaFormat = options.labelAreaFormat ?? defaultLabelAreaFormat;
			const areaUnits = options.areaUnits ?? 'kilometers';
			const polygonFeature = polygon([[...coordinates, first]]);
			const polygonAreaSquareMeters = area(polygonFeature);
			const labelPoint = pointOnFeature(polygonFeature);
			pointsFeatureCollection.features.push({
				type: 'Feature',
				id: 'area',
				properties: {
					area: labelAreaFormat(polygonAreaSquareMeters, areaUnits),
				},
				geometry: {
					type: 'Point',
					coordinates: labelPoint.geometry.coordinates,
				},
			});
		}
	}
	return pointsFeatureCollection;
}
