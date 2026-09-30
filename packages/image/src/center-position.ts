import type { Map } from 'mapbox-gl';
import type { RasterCoordinates } from './types.js';

export function centerPosition(image: HTMLImageElement, map: Map, padding = 20): RasterCoordinates {
	const canvas = map.getCanvas();
	const canvasWidth = canvas.offsetWidth;
	const canvasHeight = canvas.offsetHeight;
	const maxWidth = canvasWidth - padding * 2;
	const maxHeight = canvasHeight - padding * 2;
	const ratio = Math.min(maxWidth / image.width, maxHeight / image.height);
	const scaleWidth = image.width * ratio;
	const scaleHeight = image.height * ratio;
	const position: RasterCoordinates = [
		[(canvasWidth - scaleWidth) / 2, (canvasHeight - scaleHeight) / 2], // left top
		[(canvasWidth + scaleWidth) / 2, (canvasHeight - scaleHeight) / 2], // right top
		[(canvasWidth + scaleWidth) / 2, (canvasHeight + scaleHeight) / 2], // right bottom
		[(canvasWidth - scaleWidth) / 2, (canvasHeight + scaleHeight) / 2], // left bottom
	];

	/**
	 * reset pitch for correct projection
	 */
	map.setPitch(0);

	return [
		map.unproject(position[0]).toArray(),
		map.unproject(position[1]).toArray(),
		map.unproject(position[2]).toArray(),
		map.unproject(position[3]).toArray(),
	];
}
