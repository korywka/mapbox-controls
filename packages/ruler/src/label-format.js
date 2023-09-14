/**
 * @param {number} number
 */
export function labelFormat(number) {
	return number < 1
		? `${(number * 1000).toFixed()} m`
		: `${number.toFixed(2)} km`;
}
