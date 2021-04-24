import { Position } from 'geojson';

export default function pointFeatureCollection(coordinates:Position[] = [], labels:string[] = []): GeoJSON.FeatureCollection {
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
