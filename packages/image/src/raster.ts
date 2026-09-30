import type { Feature, FeatureCollection, Point, Polygon } from 'geojson';
import type {
	CircleLayerSpecification,
	FillLayerSpecification,
	ImageSourceSpecification,
	LineLayerSpecification,
	RasterLayerSpecification,
} from 'mapbox-gl';
import type { RasterCoordinates } from './types.js';
import { featureCollection, polygon, point } from '@turf/helpers';

export class Raster {
	src: string;
	width: number;
	height: number;
	coordinates: RasterCoordinates;
	locked: boolean;

	constructor(image: HTMLImageElement, coordinates: RasterCoordinates) {
		this.src = image.src;
		this.width = image.width;
		this.height = image.height;
		this.coordinates = coordinates;
		this.locked = false;
	}

	get id() {
		const id = this.src.split('/').pop();
		if (!id) throw Error(`can't get id from '${this.src}' source`);
		return id;
	}

	get rasterSource(): { id: string; source: ImageSourceSpecification } {
		return {
			id: `$raster:${this.id}`,
			source: {
				type: 'image',
				url: this.src,
				coordinates: this.coordinates,
			},
		};
	}

	get polygonSource(): { id: string; source: { type: 'geojson'; data: Feature<Polygon> } } {
		const feature = polygon([[...this.coordinates, this.coordinates[0]]], { id: this.id });
		return {
			id: `$polygon:${this.id}`,
			source: {
				type: 'geojson',
				data: feature,
			},
		};
	}

	get pointsSource(): { id: string; source: { type: 'geojson'; data: FeatureCollection<Point> } } {
		const features = this.coordinates.map((coordinate, index) => point(coordinate, { index }));
		return {
			id: `$points:${this.id}`,
			source: {
				type: 'geojson',
				data: featureCollection(features),
			},
		};
	}

	get rasterLayer(): RasterLayerSpecification {
		return {
			id: `$raster:${this.id}`,
			type: 'raster',
			source: this.rasterSource.id,
			paint: {
				'raster-fade-duration': 0,
				'raster-opacity': 0.5,
			},
		};
	}

	get fillLayer(): FillLayerSpecification {
		return {
			id: `$fill:${this.id}`,
			type: 'fill',
			source: this.polygonSource.id,
			paint: {
				'fill-opacity': 0,
			},
		};
	}

	get contourLayer(): LineLayerSpecification {
		return {
			id: `$contour:${this.id}`,
			type: 'line',
			source: this.polygonSource.id,
			layout: {
				'line-cap': 'round',
				'line-join': 'round',
			},
			paint: {
				'line-dasharray': [0.2, 2],
				'line-color': 'rgb(61, 90, 254)',
				'line-width': ['interpolate', ['linear'], ['zoom'], 12, 1, 14, 2],
			},
		};
	}

	get knobsLayer(): CircleLayerSpecification {
		return {
			id: `$knobs:${this.id}`,
			type: 'circle',
			source: this.pointsSource.id,
			paint: {
				'circle-radius': 5,
				'circle-color': 'rgb(61, 90, 254)',
				'circle-stroke-width': 3,
				'circle-stroke-color': '#fff',
			},
		};
	}
}
