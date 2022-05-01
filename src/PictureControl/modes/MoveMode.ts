import { Map, LngLat, MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';
import { BaseMode, Cursor, PicturePosition, Visibility, OnUpdate } from '../types';
import Picture from '../Picture';
import icon from '../../icons/ts/move';
import Button from '../../Button/Button';

class MoveMode extends BaseMode {
  startPosition?: LngLat;

  static get button() {
    return (new Button()).setIcon(icon());
  }

  constructor(map: Map, picture: Picture, onUpdate: OnUpdate) {
    super(map, picture, onUpdate);
    this.onPointerEnter = this.onPointerEnter.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.map.on('mouseenter', this.picture.asFillLayer.id, this.onPointerEnter);
    this.map.on('mouseleave', this.picture.asFillLayer.id, this.onPointerLeave);
    this.map.on('mousedown', this.picture.asFillLayer.id, this.onPointerDown);
  }

  onPointerEnter() {
    this.map.getCanvas().style.cursor = Cursor.Move;
  }

  onPointerDown(event: MapLayerMouseEvent) {
    event.preventDefault();
    this.startPosition = event.lngLat;
    this.map.getCanvas().style.cursor = Cursor.Grabbing;
    this.map.on('mousemove', this.onPointerMove);
    this.map.setLayoutProperty(this.picture.asLineLayer.id, 'visibility', Visibility.None);
    document.addEventListener('pointerup', this.onPointerUp, { once: true });
  }

  onPointerMove(event: MapMouseEvent) {
    if (!this.startPosition) throw Error('start position is expected');
    const currentPosition = event.lngLat;
    const deltaLng = this.startPosition.lng - currentPosition.lng;
    const deltaLat = this.startPosition.lat - currentPosition.lat;
    this.onUpdate(this.picture.position.map((p) => new LngLat(p.lng - deltaLng, p.lat - deltaLat)) as PicturePosition);
    this.startPosition = currentPosition;
  }

  onPointerUp() {
    this.map.getCanvas().style.cursor = Cursor.Move;
    this.map.off('mousemove', this.onPointerMove);
    this.map.setLayoutProperty(this.picture.asLineLayer.id, 'visibility', Visibility.Visible);
  }

  onPointerLeave = () => {
    this.map.getCanvas().style.cursor = Cursor.Default;
  };

  destroy() {
    this.startPosition = undefined;
    this.map.getCanvas().style.cursor = Cursor.Default;
    this.map.off('mousemove', this.onPointerMove);
    this.map.off('mouseenter', this.picture.asFillLayer.id, this.onPointerEnter);
    this.map.off('mouseleave', this.picture.asFillLayer.id, this.onPointerLeave);
    this.map.off('mousedown', this.picture.asFillLayer.id, this.onPointerDown);
    document.removeEventListener('pointerup', this.onPointerUp);
  }
}

export default MoveMode;
