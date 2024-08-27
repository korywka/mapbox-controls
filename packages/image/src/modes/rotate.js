import bearing from '@turf/bearing';
import centroid from '@turf/centroid';
import { bearingToAzimuth } from '@turf/helpers';
import transformRotate from '@turf/transform-rotate';

export class Rotate {
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
		this.centroid = null;
		/** @type { [number, number] | null } */
		this.startPoint = null;
		this.map.addLayer(this.raster.knobsLayer);
		this.map.on('mouseenter', this.raster.knobsLayer.id, this.onPointerEnter);
		this.map.on('mouseleave', this.raster.knobsLayer.id, this.onPointerLeave);
		this.map.on('mousedown', this.raster.knobsLayer.id, this.onPointerDown);
	}

	get id() {
		return 'rotate';
	}

	onPointerEnter = () => {
		this.map.getCanvas().style.cursor = 'pointer';
	};

	onPointerLeave = () => {
		this.map.getCanvas().style.cursor = '';
	};

	/**
   * @param {import('mapbox-gl').MapMouseEvent} event
   */
	onPointerDown = (event) => {
		event.preventDefault();
		const geojson = this.raster.polygonSource.source.data;
		this.centroid = /** @type {[number, number]} */ (centroid(geojson).geometry.coordinates);
		this.startPoint = [event.lngLat.lng, event.lngLat.lat];
		this.map.on('mousemove', this.onPointerMove);
		document.addEventListener('pointerup', this.onPointerUp, { once: true });
	};

	/**
	 * @param {import('mapbox-gl').MapMouseEvent} event
	 */
	onPointerMove = (event) => {
		if (!this.centroid) throw Error('centroid is undefined');
		if (!this.startPoint) throw Error('previous position is undefined');
		/** @type {[number, number]} */
		const currentPosition = [event.lngLat.lng, event.lngLat.lat];
		const azimuthA = bearingToAzimuth(bearing(this.startPoint, this.centroid));
		const azimuthB = bearingToAzimuth(bearing(currentPosition, this.centroid));
		const delta = azimuthB - azimuthA;
		const geojson = this.raster.polygonSource.source.data;
		const transformed = transformRotate(geojson, delta);
		const transformedCoordinates = transformed.geometry.coordinates[0];
		// remove closing 5th coordinate from polygon
		const position = /** @type {import('../types').RasterCoordinates} */ (transformedCoordinates.slice(0, 4));
		this.onUpdate(position);
		this.startPoint = currentPosition;
	};

	onPointerUp = () => {
		this.map.getCanvas().style.cursor = 'pointer';
		this.map.off('mousemove', this.onPointerMove);
	};

	destroy() {
		this.centroid = null;
		this.startPoint = null;
		this.map.off('mouseenter', this.raster.knobsLayer.id, this.onPointerEnter);
		this.map.off('mouseleave', this.raster.knobsLayer.id, this.onPointerLeave);
		this.map.off('mousedown', this.raster.knobsLayer.id, this.onPointerDown);
		this.map.off('mousemove', this.onPointerMove);
		this.map.removeLayer(this.raster.knobsLayer.id);
		document.removeEventListener('pointerup', this.onPointerUp);
	}
}
