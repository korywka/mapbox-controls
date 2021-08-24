import { LngLat, MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';
import { contourLayer, cornersLayer } from '../layers';
import { Visibility, Cursor, ModeOptions } from '../types';
import getClosestPoint from '../../helpers/getClosestPoint';

class ResizeMode {
  name: 'resize'
  destroy: () => void

  constructor(options: ModeOptions) {
    const { map, button, picture, onUpdate } = options;
    const mapCanvas = map.getCanvas();
    let currentIndex: number;

    map.addLayer({ ...contourLayer, source: picture.polygonSource.id });
    map.addLayer({ ...cornersLayer, source: picture.cornersSource.id });

    function onPointerMove(event: MapMouseEvent) {
      const pointA = map.project(picture.position[currentIndex]);
      const pointB = map.project(picture.position[picture.getOppositePoint(currentIndex)]);
      const pointP = map.project(event.lngLat);
      const closestPoint = getClosestPoint([pointA.x, pointA.y], [pointB.x, pointB.y], [pointP.x, pointP.y]);
      const closestLngLat = map.unproject(closestPoint);
      const scaledPosition = picture.position;

      scaledPosition[currentIndex] = new LngLat(closestLngLat.lng, closestLngLat.lat);
      setResizeCursor(currentIndex);

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
      mapCanvas.style.cursor = '';
      map.off('mousemove', onPointerMove);
      map.setLayoutProperty(cornersLayer.id, 'visibility', Visibility.Visible);
      map.setLayoutProperty(contourLayer.id, 'visibility', Visibility.Visible);
    }

    function onPointerDown(event: MapLayerMouseEvent) {
      event.preventDefault();
      currentIndex = event.features[0].properties.index;
      map.on('mousemove', onPointerMove);
      map.setLayoutProperty(cornersLayer.id, 'visibility', Visibility.None);
      map.setLayoutProperty(contourLayer.id, 'visibility', Visibility.None);
      document.addEventListener('pointerup', onPointerUp, { once: true });
    }

    function onPointerEnter(event: MapLayerMouseEvent) {
      setResizeCursor(event.features[0].properties.index as number);
    }

    function onPointerLeave() {
      mapCanvas.style.cursor = '';
    }

    function setResizeCursor(index: number) {
      mapCanvas.style.cursor = [1, 3].includes(index) ? Cursor.NESWResize : Cursor.NWSEResize;
    }

    button.setActive(true);
    map.on('mouseenter', cornersLayer.id, onPointerEnter);
    map.on('mouseleave', cornersLayer.id, onPointerLeave);
    map.on('mousedown', cornersLayer.id, onPointerDown);

    this.destroy = () => {
      button.setActive(false);
      mapCanvas.style.cursor = '';
      map.off('mousemove', onPointerMove);
      map.off('mouseenter', cornersLayer.id, onPointerEnter);
      map.off('mouseleave', cornersLayer.id, onPointerLeave);
      map.off('mousedown', cornersLayer.id, onPointerDown);
      document.removeEventListener('pointerup', onPointerUp);

      if (map.getLayer(cornersLayer.id)) map.removeLayer(cornersLayer.id);
      if (map.getLayer(contourLayer.id)) map.removeLayer(contourLayer.id);
    };
  }
}

export default ResizeMode;
