import { LngLat, Map, MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';
import { contourLayer, cornersLayer } from './layers';
import { ImagePosition, Visibility } from './types';
import IImage from './IImage';

type P = [number, number];

function getClosestPoint(a: P, b: P, p: P): P {
  const u = [p[0] - a[0], p[1] - a[1]]; // vector a->p
  const v = [b[0] - a[0], b[1] - a[1]]; // vector a->b
  const v2 = v[0] ** 2 + v[1] ** 2;
  const vu = v[0] * u[0] + v[1] * u[1]; // dot product of v and u
  const t = vu / v2;

  return [a[0] + v[0] * t, a[1] + v[1] * t];
}

export default function resizeable(map: Map, image: IImage, onUpdate: (position: ImagePosition) => void): () => void {
  let currentIndex: number;

  map.addLayer({ ...contourLayer, source: image.shapeSource.id });
  map.addLayer({ ...cornersLayer, source: image.cornersSource.id });

  function onPointerMove(event: MapMouseEvent) {
    const pointA = map.project(image.position[currentIndex]);
    const pointB = map.project(image.position[image.getOppositePoint(currentIndex)]);
    const pointP = map.project(event.lngLat);
    const closestPoint = getClosestPoint([pointA.x, pointA.y], [pointB.x, pointB.y], [pointP.x, pointP.y]);
    const closestLngLat = map.unproject(closestPoint);
    const scaledPosition = image.position;

    scaledPosition[currentIndex] = new LngLat(closestLngLat.lng, closestLngLat.lat);

    if (currentIndex === 0) {
      scaledPosition[1] = new LngLat(scaledPosition[1].lng, closestLngLat.lat);
      scaledPosition[3] = new LngLat(closestLngLat.lng, scaledPosition[3].lat);
    } else if (currentIndex === 1) {
      scaledPosition[0] = new LngLat(scaledPosition[0].lng, closestLngLat.lat);
      scaledPosition[2] = new LngLat(closestLngLat.lng, scaledPosition[2].lat);
    } else if (currentIndex === 2) {
      scaledPosition[3] = new LngLat(scaledPosition[3].lng, closestLngLat.lat);
      scaledPosition[1] = new LngLat(closestLngLat.lng, scaledPosition[1].lat);
    } else if (currentIndex === 3) {
      scaledPosition[2] = new LngLat(scaledPosition[2].lng, closestLngLat.lat);
      scaledPosition[0] = new LngLat(closestLngLat.lng, scaledPosition[0].lat);
    }

    onUpdate(scaledPosition);
  }

  function onPointerUp() {
    currentIndex = null;
    map.off('mousemove', onPointerMove);
    map.setLayoutProperty(cornersLayer.id, 'visibility', Visibility.Visible);
    map.setLayoutProperty(contourLayer.id, 'visibility', Visibility.Visible);
  }

  function onPointerDown(event: MapLayerMouseEvent) {
    event.preventDefault();
    currentIndex = event.features[0].properties.index;
    map.once('mouseup', onPointerUp);
    map.on('mousemove', onPointerMove);
    map.setLayoutProperty(cornersLayer.id, 'visibility', Visibility.None);
    map.setLayoutProperty(contourLayer.id, 'visibility', Visibility.None);
  }

  function onPointerEnter() {
    //
  }

  function onPointerLeave() {
    //
  }

  map.on('mouseenter', cornersLayer.id, onPointerEnter);
  map.on('mouseleave', cornersLayer.id, onPointerLeave);
  map.on('mousedown', cornersLayer.id, onPointerDown);

  return () => {
    map.off('mousemove', onPointerMove);
    map.off('mouseenter', cornersLayer.id, onPointerEnter);
    map.off('mouseleave', cornersLayer.id, onPointerLeave);
    map.off('mousedown', cornersLayer.id, onPointerDown);
    map.removeLayer(cornersLayer.id);
    map.removeLayer(contourLayer.id);
  };
}
