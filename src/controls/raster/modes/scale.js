import oppositePointTo from '../../../helpers/oppositePoint.js';
import closestLinePoint from '../../../helpers/closestLinePoint.js';

/**
 * @param {import('mapbox-gl').Map} map
 * @param {import('../picture').default} picture
 * @param {(position: import('../../../types').Raster.Position) => void} onUpdate
 * @return {() => void}
 */
export default function scale(map, picture, onUpdate) {
  /** @type {number | undefined} */
  let currentIndex;

  map.addLayer(picture.contourLayer);
  map.addLayer(picture.knobsLayer);
  map.on('mousedown', picture.knobsLayer.id, onPointerDown);
  map.on('mouseenter', picture.knobsLayer.id, onPointerEnter);
  map.on('mouseleave', picture.knobsLayer.id, onPointerLeave);

  /**
   * @param {import('mapbox-gl').MapLayerMouseEvent} event
   */
  function onPointerEnter(event) {
    if (!event.features) return;
    /** @type {number} */
    const index = event.features[0].properties?.index;
    map.getCanvas().style.cursor = index === 0 || index === 2
      ? 'nwse-resize'
      : 'nesw-resize';
  }

  function onPointerLeave() {
    map.getCanvas().style.cursor = '';
  }

  /**
   * @param {import('mapbox-gl').MapLayerMouseEvent} event
   */
  function onPointerDown(event) {
    event.preventDefault();
    if (!event.features) return;
    map.getCanvas().style.cursor = 'grabbing';
    currentIndex = event.features[0].properties?.index;
    map.on('mousemove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp, { once: true });
  }


  /**
   * @param {import('mapbox-gl').MapMouseEvent} event
   */
  function onPointerMove(event) {
    if (currentIndex === undefined) return;
    const pointA = map.project(picture.position[currentIndex]);
    const pointB = map.project(picture.position[oppositePointTo(currentIndex)]);
    const pointP = map.project(event.lngLat);
    const closestPoint = closestLinePoint([pointA.x, pointA.y], [pointB.x, pointB.y], [pointP.x, pointP.y]);
    const closestLngLat = /** @type {[number, number]} */ (map.unproject(closestPoint).toArray());
    const scaledPosition = picture.position;

    scaledPosition[currentIndex] = closestLngLat;

    if (currentIndex === 0) {
      scaledPosition[1][1] = closestLngLat[1];
      scaledPosition[3][0] = closestLngLat[0];
    } else if (currentIndex === 1) {
      scaledPosition[0][1] = closestLngLat[1];
      scaledPosition[2][0] = closestLngLat[0];
    } else if (currentIndex === 2) {
      scaledPosition[3][1] = closestLngLat[1];
      scaledPosition[1][0] = closestLngLat[0];
    } else if (currentIndex === 3) {
      scaledPosition[2][1] = closestLngLat[1];
      scaledPosition[0][0] = closestLngLat[0];
    }

    onUpdate(scaledPosition);
  }

  function onPointerUp() {
    map.getCanvas().style.cursor = '';
    map.off('mousemove', onPointerMove);
  }

  return function () {
    currentIndex = undefined;
    map.removeLayer(picture.contourLayer.id);
    map.removeLayer(picture.knobsLayer.id);
    map.getCanvas().style.cursor = '';
    map.off('mousedown', picture.knobsLayer.id, onPointerDown);
    map.off('mousemove', onPointerMove);
    map.off('mouseenter', picture.knobsLayer.id, onPointerEnter);
    map.off('mouseleave', picture.knobsLayer.id, onPointerLeave);
    document.removeEventListener('pointerup', onPointerUp);
  };
}
