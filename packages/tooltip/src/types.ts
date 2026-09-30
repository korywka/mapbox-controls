import type { MapMouseEvent } from 'mapbox-gl';

export interface ControlOptions {
	getContent: (event: MapMouseEvent) => string;
	layer?: string;
}
