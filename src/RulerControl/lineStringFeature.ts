import { Position } from 'geojson';

export default function lineStringFeature(coordinates: Position[]): GeoJSON.Feature {
  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates,
    },
  };
}
