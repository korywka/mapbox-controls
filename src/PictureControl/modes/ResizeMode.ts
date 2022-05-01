import { LngLat, Map, MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';
import { Cursor, BaseMode, OnUpdate, Visibility } from '../types';
import closestLinePoint from '../helpers/closestLinePoint';
import icon from '../../icons/ts/resize';
import Button from '../../Button/Button';
import Picture from '../Picture';

class ResizeMode extends BaseMode {
  currentIndex?: number;

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
    if (!this.picture) return;
    this.map.getCanvas().style.cursor = Cursor.Grabbing;
    const features = event.features!;
    this.currentIndex = features[0].properties!.index;
    this.map.on('mousemove', this.onPointerMove);
    this.map.setLayoutProperty(this.picture.asCircleLayer.id, 'visibility', Visibility.None);
    this.map.setLayoutProperty(this.picture.asLineLayer.id, 'visibility', Visibility.None);
    document.addEventListener('pointerup', this.onPointerUp, { once: true });
  }

  onPointerMove(event: MapMouseEvent) {
    if (this.currentIndex === undefined) return;
    const pointA = this.map.project(this.picture.position[this.currentIndex]);
    const pointB = this.map.project(this.picture.position[this.picture.oppositePointTo(this.currentIndex)]);
    const pointP = this.map.project(event.lngLat);
    const closestPoint = closestLinePoint([pointA.x, pointA.y], [pointB.x, pointB.y], [pointP.x, pointP.y]);
    const closestLngLat = this.map.unproject(closestPoint);
    const scaledPosition = this.picture.position;

    scaledPosition[this.currentIndex] = new LngLat(closestLngLat.lng, closestLngLat.lat);

    if (this.currentIndex === 0) {
      scaledPosition[1] = new LngLat(scaledPosition[1].lng, closestLngLat.lat);
      scaledPosition[3] = new LngLat(closestLngLat.lng, scaledPosition[3].lat);
    } else if (this.currentIndex === 1) {
      scaledPosition[0] = new LngLat(scaledPosition[0].lng, closestLngLat.lat);
      scaledPosition[2] = new LngLat(closestLngLat.lng, scaledPosition[2].lat);
    } else if (this.currentIndex === 2) {
      scaledPosition[3] = new LngLat(scaledPosition[3].lng, closestLngLat.lat);
      scaledPosition[1] = new LngLat(closestLngLat.lng, scaledPosition[1].lat);
    } else if (this.currentIndex === 3) {
      scaledPosition[2] = new LngLat(scaledPosition[2].lng, closestLngLat.lat);
      scaledPosition[0] = new LngLat(closestLngLat.lng, scaledPosition[0].lat);
    }

    this.onUpdate(scaledPosition);
  }

  onPointerUp() {
    this.currentIndex = undefined;
    this.map.getCanvas().style.cursor = Cursor.Default;
    this.map.off('mousemove', this.onPointerMove);
    this.map.setLayoutProperty(this.picture.asCircleLayer.id, 'visibility', Visibility.Visible);
    this.map.setLayoutProperty(this.picture.asLineLayer.id, 'visibility', Visibility.Visible);
  }

  destroy() {
    this.map.getCanvas().style.cursor = Cursor.Default;
    this.map.off('mousemove', this.onPointerMove);
    this.map.off('mousedown', this.picture.asCircleLayer.id, this.onPointerDown);
    document.removeEventListener('pointerup', this.onPointerUp);
    this.map.removeLayer(this.picture.asCircleLayer.id);
  }
}

export default ResizeMode;
