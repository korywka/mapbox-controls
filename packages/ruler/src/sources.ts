import distance from '@turf/distance';
import type { Units } from '@turf/helpers';
import type { Feature, FeatureCollection, LineString, Point } from 'geojson';

function defaultLabelFormat(value: number) {
	return value < 1 ? `${(value * 1000).toFixed()} m` : `${value.toFixed(2)} km`;
}

export const sources = {
	line: 'mapbox-control-ruler-lines',
	points: 'mapbox-control-ruler-points',
};

export function toGeoJSONLine(coordinates: [number, number][]): Feature<LineString> {
	return {
		type: 'Feature',
		properties: {},
		geometry: {
			type: 'LineString',
			coordinates,
		},
	};
}

export function toGeoJSONPoints(
	coordinates: [number, number][],
	options: { units?: Units; labelFormat?: (v: number) => string } = {},
): FeatureCollection<Point> {
	const labelFormat = options.labelFormat ?? defaultLabelFormat;
	const units = options.units ?? 'kilometers';
	let sum = 0;
	return {
		type: 'FeatureCollection',
		features: coordinates.map((coordinate, index) => {
			if (index > 0) {
				sum += distance(coordinates[index - 1], coordinate, { units });
			}
			return {
				type: 'Feature',
				id: String(index),
				properties: {
					distance: labelFormat(sum),
				},
				geometry: {
					type: 'Point',
					coordinates: coordinate,
				},
			};
		}),
	};
}
