import { LngLat, Map, MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';
import { Cursor, BaseMode, OnUpdate, Visibility } from '../types';
import getClosestPoint from '../helpers/getClosestPoint';
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
    this.map.addLayer(this.picture.knobsLayer);
    this.map.on('mouseenter', this.picture.knobsLayer.id, this.onPointerEnter);
    this.map.on('mouseleave', this.picture.knobsLayer.id, this.onPointerLeave);
    this.map.on('mousedown', this.picture.knobsLayer.id, this.onPointerDown);
  }

  setResizeCursor = (index: number) => {
    this.map.getCanvas().style.cursor = [1, 3].includes(index) ? Cursor.NESWResize : Cursor.NWSEResize;
  };

  onPointerMove = (event: MapMouseEvent) => {
    if (this.currentIndex === undefined) return;
    const pointA = this.map.project(this.picture.position[this.currentIndex]);
    const pointB = this.map.project(this.picture.position[this.picture.oppositePointTo(this.currentIndex)]);
    const pointP = this.map.project(event.lngLat);
    const closestPoint = getClosestPoint([pointA.x, pointA.y], [pointB.x, pointB.y], [pointP.x, pointP.y]);
    const closestLngLat = this.map.unproject(closestPoint);
    const scaledPosition = this.picture.position;

    scaledPosition[this.currentIndex] = new LngLat(closestLngLat.lng, closestLngLat.lat);
    this.setResizeCursor(this.currentIndex);

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
  };

  onPointerUp = () => {
    this.currentIndex = undefined;
    this.map.getCanvas().style.cursor = Cursor.Default;
    this.map.off('mousemove', this.onPointerMove);
    this.map.setLayoutProperty(this.picture.knobsLayer.id, 'visibility', Visibility.Visible);
    this.map.setLayoutProperty(this.picture.contourLayer.id, 'visibility', Visibility.Visible);
  };

  onPointerDown = (event: MapLayerMouseEvent) => {
    event.preventDefault();
    if (!this.picture) return;
    const features = event.features!;
    this.currentIndex = features[0].properties!.index;
    this.map.on('mousemove', this.onPointerMove);
    this.map.setLayoutProperty(this.picture.knobsLayer.id, 'visibility', Visibility.None);
    this.map.setLayoutProperty(this.picture.contourLayer.id, 'visibility', Visibility.None);
    document.addEventListener('pointerup', this.onPointerUp, { once: true });
  };

  onPointerEnter = (event: MapLayerMouseEvent) => {
    const features = event.features!;
    this.setResizeCursor(features[0].properties!.index as number);
  };

  onPointerLeave = () => {
    this.map.getCanvas().style.cursor = Cursor.Default;
  };

  destroy() {
    this.map.getCanvas().style.cursor = Cursor.Default;
    this.map.off('mousemove', this.onPointerMove);
    this.map.off('mouseenter', this.picture.knobsLayer.id, this.onPointerEnter);
    this.map.off('mouseleave', this.picture.knobsLayer.id, this.onPointerLeave);
    this.map.off('mousedown', this.picture.knobsLayer.id, this.onPointerDown);
    document.removeEventListener('pointerup', this.onPointerUp);
    this.map.removeLayer(this.picture.knobsLayer.id);
  }
}

export default ResizeMode;
