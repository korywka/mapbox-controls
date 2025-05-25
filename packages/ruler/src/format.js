import { convertArea } from '@turf/helpers';

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
export function defaultLabelFormat(value, units = 'kilometers') {
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
export function defaultLabelAreaFormat(valueSquareMeters, units = 'kilometers') {
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
