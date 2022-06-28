import { LngLat } from 'mapbox-gl';

/**
 * @param {import('mapbox-gl').Map} map
 * @param {import('../picture').default} picture
 * @param {(position: import('../../../types').RasterPicturePosition) => void} onUpdate
 */
export function moveMode(map, picture, onUpdate) {
  /** @type {import('mapbox-gl').LngLat | undefined} */
  let startPosition;

  console.log('hhh');

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
    startPosition = event.lngLat;
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
    const currentPosition = event.lngLat;
    const deltaLng = startPosition.lng - currentPosition.lng;
    const deltaLat = startPosition.lat - currentPosition.lat;
    const position = picture.position.map((p) => new LngLat(p.lng - deltaLng, p.lat - deltaLat));
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
    map.getCanvas().style.cursor = '';
    map.off('mousemove', onPointerMove);
    map.off('mouseenter', picture.fillLayer.id, onPointerEnter);
    map.off('mouseleave', picture.fillLayer.id, onPointerLeave);
    map.off('mousedown', picture.fillLayer.id, onPointerDown);
    document.removeEventListener('pointerup', onPointerUp);
  };
}
