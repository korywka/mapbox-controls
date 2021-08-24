import { FillLayer, LngLat, MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';
import { Cursor, PicturePosition, ModeOptions, Visibility } from '../types';
import { contourLayer } from '../layers';

const shadowLayer: FillLayer = {
  id: '$shadowLayerId',
  type: 'fill',
  paint: { 'fill-opacity': 0 },
};

class MoveMode {
  name: 'move'
  destroy: () => void

  constructor(options: ModeOptions) {
    const { map, button, picture, onUpdate } = options;
    const mapCanvas = map.getCanvas();
    let startPosition: LngLat = null;

    map.addLayer({ ...contourLayer, source: picture.polygonSource.id });
    map.addLayer({ ...shadowLayer, source: picture.polygonSource.id });

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
      mapCanvas.style.cursor = '';
    }

    button.setActive(true);
    map.on('mouseenter', shadowLayer.id, onPointerEnter);
    map.on('mouseleave', shadowLayer.id, onPointerLeave);
    map.on('mousedown', shadowLayer.id, onPointerDown);

    this.destroy = () => {
      button.setActive(false);
      mapCanvas.style.cursor = '';
      map.off('mousemove', onPointerMove);
      map.off('mouseenter', shadowLayer.id, onPointerEnter);
      map.off('mouseleave', shadowLayer.id, onPointerLeave);
      map.off('mousedown', shadowLayer.id, onPointerDown);
      document.removeEventListener('pointerup', onPointerUp);

      if (map.getLayer(shadowLayer.id)) map.removeLayer(shadowLayer.id);
      if (map.getLayer(contourLayer.id)) map.removeLayer(contourLayer.id);
    };
  }
}

export default MoveMode;
