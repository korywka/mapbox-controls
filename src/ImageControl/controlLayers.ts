import { CircleLayer, LineLayer } from 'mapbox-gl';
import IImage from './IImage';

export const highlightLayerId = '$highlight';
export const resizeLayerId = '$resize';

export const highlightLayer = function (image: IImage): LineLayer {
  return ({
    id: highlightLayerId,
    type: 'line',
    source: image.polygonSource.id,
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-dasharray': [0.2, 2],
      'line-color': '#3D5AFE',
      'line-width': 2,
    },
  });
};

export const resizeLayer = function (image: IImage): CircleLayer {
  return ({
    id: resizeLayerId,
    type: 'circle',
    source: image.pointsSource.id,
    paint: {
      'circle-radius': 5,
      'circle-color': '#3D5AFE',
      'circle-stroke-width': 3,
      'circle-stroke-color': '#fff',
    }
  });
};
