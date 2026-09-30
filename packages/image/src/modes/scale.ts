import type { Map, MapMouseEvent } from 'mapbox-gl';
import type { Raster } from '../raster.js';
import type { RasterCoordinates } from '../types.js';
import rhumbDistance from '@turf/rhumb-distance';
import transformScale from '@turf/transform-scale';

export class Scale {
	map: Map;
	raster: Raster;
	onUpdate: (coordinates: RasterCoordinates) => void;
	knobIndex: number | null;

	constructor(map: Map, raster: Raster, onUpdate: (coordinates: RasterCoordinates) => void) {
		this.map = map;
		this.raster = raster;
		this.onUpdate = onUpdate;
		this.knobIndex = null;
		this.map.addLayer(this.raster.knobsLayer);
		this.map.on('mouseenter', this.raster.knobsLayer.id, this.onPointerEnter);
		this.map.on('mouseleave', this.raster.knobsLayer.id, this.onPointerLeave);
		this.map.on('mousedown', this.raster.knobsLayer.id, this.onPointerDown);
	}

	get id() {
		return 'scale';
	}

	onPointerEnter = (event: MapMouseEvent) => {
		if (!event.features) return;
		this.map.getCanvas().style.cursor = 'pointer';
	};

	onPointerLeave = () => {
		this.map.getCanvas().style.cursor = '';
	};

	onPointerDown = (event: MapMouseEvent) => {
		event.preventDefault();
		if (!event.features) return;
		this.map.getCanvas().style.cursor = 'grabbing';
		this.knobIndex = event.features[0].properties?.index;
		this.map.on('mousemove', this.onPointerMove);
		document.addEventListener('pointerup', this.onPointerUp, { once: true });
	};

	onPointerMove = (event: MapMouseEvent) => {
		if (typeof this.knobIndex !== 'number') throw Error('knob index is undefined');
		const index0 = (this.knobIndex + 2) % 4;
		const point0 = this.raster.coordinates[index0];
		const pointA = this.raster.coordinates[this.knobIndex];
		const pointB = [event.lngLat.lng, event.lngLat.lat];
		const distA0 = rhumbDistance(pointA, point0);
		const distB0 = rhumbDistance(pointB, point0);
		const scale = distB0 / distA0;
		const geojson = this.raster.polygonSource.source.data;
		const transformed = transformScale(geojson, scale, { origin: point0 });
		const transformedCoordinates = transformed.geometry.coordinates[0];
		// remove closing 5th coordinate from polygon
		const position = transformedCoordinates.slice(0, 4) as RasterCoordinates;
		this.onUpdate(position);
	};

	onPointerUp = () => {
		this.map.getCanvas().style.cursor = '';
		this.map.off('mousemove', this.onPointerMove);
	};

	destroy() {
		this.map.off('mouseenter', this.raster.knobsLayer.id, this.onPointerEnter);
		this.map.off('mouseleave', this.raster.knobsLayer.id, this.onPointerLeave);
		this.map.off('mousedown', this.raster.knobsLayer.id, this.onPointerDown);
		this.map.off('mousemove', this.onPointerMove);
		this.map.removeLayer(this.raster.knobsLayer.id);
		document.removeEventListener('pointerup', this.onPointerUp);
	}
}
