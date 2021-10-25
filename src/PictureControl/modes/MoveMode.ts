import { Map, LngLat, MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';
import { Mode, Cursor, PicturePosition, Visibility, OnUpdate } from '../types';
import Picture from '../Picture';
import iconMove from '../../icons/move';

class MoveMode extends Mode {
  startPosition?: LngLat

  constructor(map: Map, onUpdate: OnUpdate) {
    super(map, onUpdate);
    this.button.setIcon(iconMove());
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerEnter = this.onPointerEnter.bind(this);
    this.onPointerLeave = this.onPointerLeave.bind(this);
  }

  activate(picture: Picture) {
    super.activate(picture);
    this.startPosition = undefined;
    this.button.setActive(true);
    this.map.on('mouseenter', picture.fillLayer.id, this.onPointerEnter);
    this.map.on('mouseleave', picture.fillLayer.id, this.onPointerLeave);
    this.map.on('mousedown', picture.fillLayer.id, this.onPointerDown);
  }

  deactivate() {
    if (!this.picture) return;
    this.button.setActive(false);
    this.map.getCanvas().style.cursor = Cursor.Default;
    this.map.off('mousemove', this.onPointerMove);
    this.map.off('mouseenter', this.picture.fillLayer.id, this.onPointerEnter);
    this.map.off('mouseleave', this.picture.fillLayer.id, this.onPointerLeave);
    this.map.off('mousedown', this.picture.fillLayer.id, this.onPointerDown);
    document.removeEventListener('pointerup', this.onPointerUp);
    super.deactivate();
  }

  onPointerMove(event: MapMouseEvent) {
    if (!this.picture) return;
    if (!this.startPosition) throw Error('start position is expected');
    const currentPosition = event.lngLat;
    const deltaLng = this.startPosition.lng - currentPosition.lng;
    const deltaLat = this.startPosition.lat - currentPosition.lat;
    this.onUpdate(this.picture.position.map(p => new LngLat(p.lng - deltaLng, p.lat - deltaLat)) as PicturePosition);
    this.startPosition = currentPosition;
  }

  onPointerUp() {
    if (!this.picture) return;
    this.map.getCanvas().style.cursor = Cursor.Move;
    this.map.off('mousemove', this.onPointerMove);
    this.map.setLayoutProperty(this.picture.getContourLayer().id, 'visibility', Visibility.Visible);
  }

  onPointerDown(event: MapLayerMouseEvent) {
    event.preventDefault();
    if (!this.picture) return;
    this.startPosition = event.lngLat;
    this.map.getCanvas().style.cursor = Cursor.Grabbing;
    this.map.on('mousemove', this.onPointerMove);
    this.map.setLayoutProperty(this.picture.getContourLayer().id, 'visibility', Visibility.None);
    document.addEventListener('pointerup', this.onPointerUp, { once: true });
  }

  onPointerEnter() {
    this.map.getCanvas().style.cursor = Cursor.Move;
  }

  onPointerLeave() {
    this.map.getCanvas().style.cursor = Cursor.Default;
  }
}

export default MoveMode;
