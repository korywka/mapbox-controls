import type { Map, MapMouseEvent } from 'mapbox-gl';
import type { Raster } from '../raster.js';
import type { RasterCoordinates } from '../types.js';
import rhumbBearing from '@turf/rhumb-bearing';
import rhumbDistance from '@turf/rhumb-distance';
import transformTranslate from '@turf/transform-translate';

export class Move {
	map: Map;
	raster: Raster;
	onUpdate: (coordinates: RasterCoordinates) => void;
	prevPosition: [number, number] | null;

	constructor(map: Map, raster: Raster, onUpdate: (coordinates: RasterCoordinates) => void) {
		this.map = map;
		this.raster = raster;
		this.onUpdate = onUpdate;
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

	onPointerDown = (event: MapMouseEvent) => {
		event.preventDefault();
		this.prevPosition = [event.lngLat.lng, event.lngLat.lat];
		this.map.on('mousemove', this.onPointerMove);
		this.map.getCanvas().style.cursor = 'grabbing';
		document.addEventListener('pointerup', this.onPointerUp, { once: true });
	};

	onPointerMove = (event: MapMouseEvent) => {
		if (!this.prevPosition) throw Error('previous position is undefined');
		const currentPosition: [number, number] = [event.lngLat.lng, event.lngLat.lat];
		const bearingBetween = rhumbBearing(this.prevPosition, currentPosition);
		const distanceBetween = rhumbDistance(this.prevPosition, currentPosition);
		const geojson = this.raster.polygonSource.source.data;
		const transformed = transformTranslate(geojson, distanceBetween, bearingBetween);
		const transformedCoordinates = transformed.geometry.coordinates[0];
		// remove closing 5th coordinate from polygon
		const position = transformedCoordinates.slice(0, 4) as RasterCoordinates;
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
