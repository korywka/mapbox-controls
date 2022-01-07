import type { Position } from 'geojson';

type FeatureCollection = GeoJSON.FeatureCollection;

export default function pointFeatureCollection(coordinates:Position[] = [], labels:string[] = []): FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: coordinates.map((c, i) => ({
      type: 'Feature',
      properties: {
        text: labels[i],
      },
      geometry: {
        type: 'Point',
        coordinates: c,
      },
    })),
  };
}
