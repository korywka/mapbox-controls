import rhumbBearing from '@turf/rhumb-bearing';
import rhumbDistance from '@turf/rhumb-distance';
import transformTranslate from '@turf/transform-translate';

export class Move {
	/**
	 * @param {import('mapbox-gl').Map} map
	 * @param {import('../raster').Raster} raster
	 * @param {(coordinates: import('../types').RasterCoordinates) => void} onUpdate
	 */
	constructor(map, raster, onUpdate) {
		this.map = map;
		this.raster = raster;
		this.onUpdate = onUpdate;
		/** @type { [number, number] | null } */
		this.prevPosition = null;
		this.map.on('mouseenter', this.raster.fillLayer.id, this.onPointerEnter);
		this.map.on('mouseleave', this.raster.fillLayer.id, this.onPointerLeave);
		this.map.on('mousedown', this.raster.fillLayer.id, this.onPointerDown);
	}

	get id() {
		return 'move';
	}

	onPointerEnter = () => {
		this.map.getCanvas().style.cursor = 'move';
	};

	onPointerLeave = () => {
		this.map.getCanvas().style.cursor = '';
	};

	/**
   * @param {import('mapbox-gl').MapMouseEvent} event
   */
	onPointerDown = (event) => {
		event.preventDefault();
		this.prevPosition = [event.lngLat.lng, event.lngLat.lat];
		this.map.on('mousemove', this.onPointerMove);
		this.map.getCanvas().style.cursor = 'grabbing';
		document.addEventListener('pointerup', this.onPointerUp, { once: true });
	};

	/**
	 * @param {import('mapbox-gl').MapMouseEvent} event
	 */
	onPointerMove = (event) => {
		if (!this.prevPosition) throw Error('previous position is undefined');
		/** @type {[number, number]} */
		const currentPosition = [event.lngLat.lng, event.lngLat.lat];
		const bearingBetween = rhumbBearing(this.prevPosition, currentPosition);
		const distanceBetween = rhumbDistance(this.prevPosition, currentPosition);
		const geojson = this.raster.polygonSource.source.data;
		const transformed = transformTranslate(geojson, distanceBetween, bearingBetween);
		const transformedCoordinates = transformed.geometry.coordinates[0];
		// remove closing 5th coordinate from polygon
		const position = /** @type {import('../types').RasterCoordinates} */ (transformedCoordinates.slice(0, 4));
		this.onUpdate(position);
		this.prevPosition = currentPosition;
	};

	onPointerUp = () => {
		this.map.getCanvas().style.cursor = 'move';
		this.map.off('mousemove', this.onPointerMove);
	};

	destroy() {
		this.prevPosition = null;
		this.map.getCanvas().style.cursor = '';
		this.map.off('mouseenter', this.raster.fillLayer.id, this.onPointerEnter);
		this.map.off('mouseleave', this.raster.fillLayer.id, this.onPointerLeave);
		this.map.off('mousedown', this.raster.fillLayer.id, this.onPointerDown);
		this.map.off('mousemove', this.onPointerMove);
		document.removeEventListener('pointerup', this.onPointerUp);
	}
}
