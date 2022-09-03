import bearing from '@turf/bearing';
import distance from '@turf/distance';
import transformTranslate from '@turf/transform-translate';

/**
 * @param {import('mapbox-gl').Map} map
 * @param {import('../picture').default} picture
 * @param {(position: import('../../../types').Raster.Position) => void} onUpdate
 * @return {() => void}
 */
export default function move(map, picture, onUpdate) {
  /** @type {number[] | undefined} */
  let startPosition;

  map.addLayer(picture.contourLayer);
  map.on('mouseenter', picture.fillLayer.id, onPointerEnter);
  map.on('mouseleave', picture.fillLayer.id, onPointerLeave);
  map.on('mousedown', picture.fillLayer.id, onPointerDown);

  function onPointerEnter() {
    map.getCanvas().style.cursor = 'move';
  }

  function onPointerLeave() {
    map.getCanvas().style.cursor = '';
  }

  /**
   * @param {import('mapbox-gl').MapLayerMouseEvent} event
   */
  function onPointerDown(event) {
    event.preventDefault();
    startPosition = [event.lngLat.lng, event.lngLat.lat];
    map.getCanvas().style.cursor = 'grabbing';
    map.on('mousemove', onPointerMove);
    map.setLayoutProperty(picture.contourLayer.id, 'visibility', 'none');
    document.addEventListener('pointerup', onPointerUp, { once: true });
  }

  /**
   * @param {import('mapbox-gl').MapMouseEvent} event
   */
  function onPointerMove(event) {
    if (!startPosition) throw Error('start position is expected');
    const currentPosition = [event.lngLat.lng, event.lngLat.lat];
    const bearingBetween = bearing(startPosition, currentPosition);
    const distanceBetween = distance(startPosition, currentPosition);
    const translated = transformTranslate(picture.asJSONPolygon, distanceBetween, bearingBetween);
    const translatedCoordinates = translated.geometry.coordinates[0];

    /** @type {import('../../../types').Raster.Position} */
    const position = [
      [translatedCoordinates[0][0], translatedCoordinates[0][1]],
      [translatedCoordinates[1][0], translatedCoordinates[1][1]],
      [translatedCoordinates[2][0], translatedCoordinates[2][1]],
      [translatedCoordinates[3][0], translatedCoordinates[3][1]],
    ];

    onUpdate(position);

    startPosition = currentPosition;
  }

  function onPointerUp() {
    map.getCanvas().style.cursor = 'move';
    map.off('mousemove', onPointerMove);
    map.setLayoutProperty(picture.contourLayer.id, 'visibility', 'visible');
  }

  return function () {
    startPosition = undefined;
    map.removeLayer(picture.contourLayer.id);
    map.getCanvas().style.cursor = '';
    map.off('mousemove', onPointerMove);
    map.off('mouseenter', picture.fillLayer.id, onPointerEnter);
    map.off('mouseleave', picture.fillLayer.id, onPointerLeave);
    map.off('mousedown', picture.fillLayer.id, onPointerDown);
    document.removeEventListener('pointerup', onPointerUp);
  };
}
