import { LngLat, MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';
import { Cursor, PicturePosition, ModeOptions, Visibility } from '../types';

class MoveMode {
  name: 'move'
  destroy: () => void

  constructor(options: ModeOptions) {
    const { map, button, picture, onUpdate } = options;
    const mapCanvas = map.getCanvas();
    const contourLayer = picture.getContourLayer();
    let startPosition: LngLat = null;

    function onPointerMove(event: MapMouseEvent) {
      const currentPosition = event.lngLat;
      const deltaLng = startPosition.lng - currentPosition.lng;
      const deltaLat = startPosition.lat - currentPosition.lat;
      onUpdate(picture.position.map(p => new LngLat(p.lng - deltaLng, p.lat - deltaLat)) as PicturePosition);
      startPosition = currentPosition;
    }

    function onPointerUp() {
      mapCanvas.style.cursor = Cursor.Move;
      map.off('mousemove', onPointerMove);
      map.setLayoutProperty(contourLayer.id, 'visibility', Visibility.Visible);
    }

    function onPointerDown(event: MapLayerMouseEvent) {
      event.preventDefault();
      startPosition = event.lngLat;
      mapCanvas.style.cursor = Cursor.Grabbing;
      map.on('mousemove', onPointerMove);
      map.setLayoutProperty(contourLayer.id, 'visibility', Visibility.None);
      document.addEventListener('pointerup', onPointerUp, { once: true });
    }

    function onPointerEnter() {
      mapCanvas.style.cursor = Cursor.Move;
    }

    function onPointerLeave() {
      mapCanvas.style.cursor = Cursor.Default;
    }

    button.setActive(true);
    map.on('mouseenter', picture.fillLayer.id, onPointerEnter);
    map.on('mouseleave', picture.fillLayer.id, onPointerLeave);
    map.on('mousedown', picture.fillLayer.id, onPointerDown);

    this.destroy = () => {
      button.setActive(false);
      mapCanvas.style.cursor = Cursor.Default;
      map.off('mousemove', onPointerMove);
      map.off('mouseenter', picture.fillLayer.id, onPointerEnter);
      map.off('mouseleave', picture.fillLayer.id, onPointerLeave);
      map.off('mousedown', picture.fillLayer.id, onPointerDown);
      document.removeEventListener('pointerup', onPointerUp);
    };
  }
}

export default MoveMode;
