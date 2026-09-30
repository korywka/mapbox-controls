import type { Map, MapMouseEvent } from 'mapbox-gl';
import type { Raster } from '../raster.js';
import type { RasterCoordinates } from '../types.js';
import bearing from '@turf/bearing';
import centroid from '@turf/centroid';
import { bearingToAzimuth } from '@turf/helpers';
import transformRotate from '@turf/transform-rotate';

export class Rotate {
	map: Map;
	raster: Raster;
	onUpdate: (coordinates: RasterCoordinates) => void;
	centroid: [number, number] | null;
	startPoint: [number, number] | null;

	constructor(map: Map, raster: Raster, onUpdate: (coordinates: RasterCoordinates) => void) {
		this.map = map;
		this.raster = raster;
		this.onUpdate = onUpdate;
		this.centroid = null;
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

	onPointerDown = (event: MapMouseEvent) => {
		event.preventDefault();
		const geojson = this.raster.polygonSource.source.data;
		this.centroid = centroid(geojson).geometry.coordinates as [number, number];
		this.startPoint = [event.lngLat.lng, event.lngLat.lat];
		this.map.on('mousemove', this.onPointerMove);
		document.addEventListener('pointerup', this.onPointerUp, { once: true });
	};

	onPointerMove = (event: MapMouseEvent) => {
		if (!this.centroid) throw Error('centroid is undefined');
		if (!this.startPoint) throw Error('previous position is undefined');
		const currentPosition: [number, number] = [event.lngLat.lng, event.lngLat.lat];
		const azimuthA = bearingToAzimuth(bearing(this.startPoint, this.centroid));
		const azimuthB = bearingToAzimuth(bearing(currentPosition, this.centroid));
		const delta = azimuthB - azimuthA;
		const geojson = this.raster.polygonSource.source.data;
		const transformed = transformRotate(geojson, delta);
		const transformedCoordinates = transformed.geometry.coordinates[0];
		// remove closing 5th coordinate from polygon
		const position = transformedCoordinates.slice(0, 4) as RasterCoordinates;
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
