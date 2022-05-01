import { Map, LngLat, MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';
import angle from '@turf/angle';
import { BaseMode, Cursor, OnUpdate, Visibility } from '../types';
import icon from '../../icons/ts/rotate';
import Button from '../../Button/Button';
import Picture from '../Picture';

class RotateMode extends BaseMode {
  startPosition?: LngLat;

  static get button() {
    return (new Button()).setIcon(icon());
  }

  constructor(map: Map, picture: Picture, onUpdate: OnUpdate) {
    super(map, picture, onUpdate);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.map.addLayer(this.picture.asCircleLayer);
    this.map.on('mousedown', this.picture.asCircleLayer.id, this.onPointerDown);
  }

  onPointerDown(event: MapLayerMouseEvent) {
    event.preventDefault();
    console.log('222', this.picture);
    if (!this.picture) return;
    this.map.getCanvas().style.cursor = Cursor.Grabbing;
    this.startPosition = event.lngLat;
    this.map.on('mousemove', this.onPointerMove);
    this.map.setLayoutProperty(this.picture.asCircleLayer.id, 'visibility', Visibility.None);
    this.map.setLayoutProperty(this.picture.asLineLayer.id, 'visibility', Visibility.None);
    document.addEventListener('pointerup', this.onPointerUp, { once: true });
  }

  onPointerMove(event: MapMouseEvent) {
    if (!this.startPosition) throw Error('start position is expected');
    const currentPosition = event.lngLat;
    // const coords = this.picture.position.map((p) => p.toArray());
    // console.log(coords);
    // console.log(this.picture.centroid);
    // console.log(currentPosition.toArray());
    console.log(angle(currentPosition.toArray(), this.picture.centroid, this.startPosition.toArray()));
    // const deltaLng = this.startPosition.lng - currentPosition.lng;
    // const deltaLat = this.startPosition.lat - currentPosition.lat;
    // this.onUpdate(this.picture.position.map((p) => new LngLat(p.lng - deltaLng, p.lat - deltaLat)) as PicturePosition);
    // this.startPosition = currentPosition;
  }

  onPointerUp() {
    this.map.getCanvas().style.cursor = Cursor.Move;
    this.map.off('mousemove', this.onPointerMove);
    this.map.setLayoutProperty(this.picture.asLineLayer.id, 'visibility', Visibility.Visible);
  }

  destroy() {
    this.map.removeLayer(this.picture.asCircleLayer.id);
  }
}

export default RotateMode;
