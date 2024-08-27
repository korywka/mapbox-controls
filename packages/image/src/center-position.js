/**
 * @param {HTMLImageElement} image
 * @param {import('mapbox-gl').Map} map
 * @param {number} padding
 */
export function centerPosition(image, map, padding = 20) {
	const canvas = map.getCanvas();
	const canvasWidth = canvas.offsetWidth;
	const canvasHeight = canvas.offsetHeight;
	const maxWidth = canvasWidth - padding * 2;
	const maxHeight = canvasHeight - padding * 2;
	const ratio = Math.min(maxWidth / image.width, maxHeight / image.height);
	const scaleWidth = image.width * ratio;
	const scaleHeight = image.height * ratio;
	/** @type {import('./types').RasterCoordinates} */
	const position = [
		[(canvasWidth - scaleWidth) / 2, (canvasHeight - scaleHeight) / 2], // left top
		[(canvasWidth + scaleWidth) / 2, (canvasHeight - scaleHeight) / 2], // right top
		[(canvasWidth + scaleWidth) / 2, (canvasHeight + scaleHeight) / 2], // right bottom
		[(canvasWidth - scaleWidth) / 2, (canvasHeight + scaleHeight) / 2], // left bottom
	];

	/**
	 * reset pitch for correct projection
	 */
	map.setPitch(0);

	return /** @type {import('./types').RasterCoordinates} */ ([
		map.unproject(position[0]).toArray(),
		map.unproject(position[1]).toArray(),
		map.unproject(position[2]).toArray(),
		map.unproject(position[3]).toArray(),
	]);
}

