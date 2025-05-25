import area from '@turf/area';
import distance from '@turf/distance';
import pointOnFeature from '@turf/point-on-feature';
import { polygon, convertArea } from '@turf/helpers';

/**
 * @type {Record<import('@turf/helpers').Units | import('@turf/helpers').AreaUnits, string>}
 */
const UNIT_SYMBOLS = {
	acres: 'ac',
	centimeters: 'cm',
	centimetres: 'cm',
	degrees: '°',
	feet: 'ft',
	hectares: 'ha',
	inches: 'in',
	kilometers: 'km',
	kilometres: 'km',
	meters: 'm',
	metres: 'm',
	miles: 'mi',
	millimeters: 'mm',
	millimetres: 'mm',
	nauticalmiles: 'nmi',
	radians: 'rad',
	yards: 'yd',
};

/**
 * @param {number} value
 * @param {number} maximumFractionDigits
 * @returns {string}
 */
function formatNumber(value, maximumFractionDigits = 2) {
	return value.toLocaleString(undefined, { maximumFractionDigits });
}

/**
 * @param {number} value
 * @param {import('@turf/helpers').Units} units
 * @returns {string}
 */
function defaultLabelFormat(value, units = 'kilometers') {
	switch (units) {
		case 'meters':
			return value < 1000
				? `${formatNumber(value, 0)} m`
				: `${formatNumber(value / 1000)} km`;
		case 'kilometers':
			return value < 1
				? `${formatNumber(value * 1000, 0)} m`
				: `${formatNumber(value)} km`;
		default:
			return `${formatNumber(value)} ${UNIT_SYMBOLS[units] ?? units}`;
	}
}

/**
 * @param {number} valueSquareMeters
 * @param {import('@turf/helpers').AreaUnits} units
 * @returns {string}
 */
function defaultLabelAreaFormat(valueSquareMeters, units = 'kilometers') {
	const value = convertArea(valueSquareMeters, 'meters', units);
	switch (units) {
		case 'meters':
			return value < 1_000_000
				? `${formatNumber(value, 0)} m²`
				: `${formatNumber(value / 1_000_000)} km²`;
		case 'kilometers':
			return value < 1
				? `${formatNumber(value * 1_000_000, 0)} m²`
				: `${formatNumber(value)} km²`;
		default: {
			const hasSqrSymbol = !['acres', 'hectares'].includes(units);
			return `${formatNumber(value)} ${UNIT_SYMBOLS[units] ?? units}${hasSqrSymbol ? '²' : ''}`;		}
	}
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
