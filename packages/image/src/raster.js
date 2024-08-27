import { featureCollection, polygon, point } from '@turf/helpers';

export class Raster {
	/**
	 * @param {HTMLImageElement} image
	 * @param {import('./types').RasterCoordinates} coordinates
	 */
	constructor(image, coordinates) {
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

	/**
	 * @type {{
	 * 	id: string,
	 * 	source: import('mapbox-gl').ImageSourceSpecification
	 * }}
	 */
	get rasterSource() {
		return {
			id: `$raster:${this.id}`,
			source: {
				type: 'image',
				url: this.src,
				coordinates: this.coordinates,
			},
		};
	}

	/**
	 * @type {{
	 * 	id: string,
	 * 	source: {
	 * 		type: 'geojson',
	 * 		data: import('geojson').Feature<import('geojson').Polygon>
	 * 	}
	 * }}
	 */
	get polygonSource() {
		const feature = polygon([[...this.coordinates, this.coordinates[0]]], { id: this.id });
		return {
			id: `$polygon:${this.id}`,
			source: {
				type: 'geojson',
				data: feature,
			},
		};
	}

	/**
	 * @type {{
	 * 	id: string,
	 * 	source: {
	 * 		type: 'geojson',
	 * 		data: import('geojson').FeatureCollection<import('geojson').Point>
	 * 	}
	 * }}
	 */
	get pointsSource() {
		const features = this.coordinates.map((coordinate, index) => point(coordinate, { index }));
		return {
			id: `$points:${this.id}`,
			source: {
				type: 'geojson',
				data: featureCollection(features),
			},
		};
	}

	/** @type {import('mapbox-gl').RasterLayerSpecification} */
	get rasterLayer() {
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

	/** @type {import('mapbox-gl').FillLayerSpecification} */
	get fillLayer() {
		return {
			id: `$fill:${this.id}`,
			type: 'fill',
			source: this.polygonSource.id,
			paint: {
				'fill-opacity': 0,
			},
		};
	}

	/** @type {import('mapbox-gl').LineLayerSpecification} */
	get contourLayer() {
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
				'line-width': [
					'interpolate', ['linear'], ['zoom'],
					12, 1,
					14, 2,
				],
			},
		};
	}

	/** @type {import('mapbox-gl').CircleLayerSpecification} */
	get knobsLayer() {
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
