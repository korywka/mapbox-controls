import { LngLat, Map, MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';
import { Cursor, Mode, OnUpdate, Visibility } from '../types';
import getClosestPoint from '../helpers/getClosestPoint';
import iconResize from '../../icons/resize';
import Button from '../../Button/Button';
import Picture from '../Picture';

class ResizeMode extends Mode {
  currentIndex?: number

  constructor(map: Map, onUpdate: OnUpdate) {
    super(map, onUpdate);
    this.button = (new Button()).setIcon(iconResize());
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerEnter = this.onPointerEnter.bind(this);
    this.onPointerLeave = this.onPointerLeave.bind(this);
  }

  activate(picture: Picture) {
    this.button.setActive(true);
    this.picture = picture;
    const knobsLayer = picture.getKnobsLayer();
    this.map.addLayer(knobsLayer);
    this.map.on('mouseenter', knobsLayer.id, this.onPointerEnter);
    this.map.on('mouseleave', knobsLayer.id, this.onPointerLeave);
    this.map.on('mousedown', knobsLayer.id, this.onPointerDown);
  }

  deactivate() {
    if (!this.picture) return;
    this.button.setActive(false);
    const knobsLayer = this.picture.getKnobsLayer();
    this.map.getCanvas().style.cursor = Cursor.Default;
    this.map.off('mousemove', this.onPointerMove);
    this.map.off('mouseenter', knobsLayer.id, this.onPointerEnter);
    this.map.off('mouseleave', knobsLayer.id, this.onPointerLeave);
    this.map.off('mousedown', knobsLayer.id, this.onPointerDown);
    document.removeEventListener('pointerup', this.onPointerUp);
    if (this.map.getLayer(knobsLayer.id)) this.map.removeLayer(knobsLayer.id);
  }

  setResizeCursor(index: number) {
    this.map.getCanvas().style.cursor = [1, 3].includes(index) ? Cursor.NESWResize : Cursor.NWSEResize;
  }

  onPointerMove(event: MapMouseEvent) {
    if (!this.picture) return;
    if (!this.currentIndex) return;
    const pointA = this.map.project(this.picture.position[this.currentIndex]);
    const pointB = this.map.project(this.picture.position[this.picture.getOppositePoint(this.currentIndex)]);
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
  }

  onPointerUp() {
    if (!this.picture) return;
    this.currentIndex = undefined;
    this.map.getCanvas().style.cursor = Cursor.Default;
    this.map.off('mousemove', this.onPointerMove);
    this.map.setLayoutProperty(this.picture.getKnobsLayer().id, 'visibility', Visibility.Visible);
    this.map.setLayoutProperty(this.picture.getContourLayer().id, 'visibility', Visibility.Visible);
  }

  onPointerDown(event: MapLayerMouseEvent) {
    event.preventDefault();
    if (!this.picture) return;
    const features = event.features!;
    this.currentIndex = features[0].properties!.index;
    this.map.on('mousemove', this.onPointerMove);
    this.map.setLayoutProperty(this.picture.getKnobsLayer().id, 'visibility', Visibility.None);
    this.map.setLayoutProperty(this.picture.getContourLayer().id, 'visibility', Visibility.None);
    document.addEventListener('pointerup', this.onPointerUp, { once: true });
  }

  onPointerEnter(event: MapLayerMouseEvent) {
    const features = event.features!;
    this.setResizeCursor(features[0].properties!.index as number);
  }

  onPointerLeave() {
    this.map.getCanvas().style.cursor = Cursor.Default;
  }
}

export default ResizeMode;

// import { LngLat, MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';
// import { Visibility, Cursor, ModeOptions, Mode } from '../types';
// import getClosestPoint from '../../helpers/getClosestPoint';
// import Button from '../../Button/Button';
// import iconResize from '../../icons/resize';
// import Picture from '../Picture';
// import iconMove from '../../icons/move';
//
// class ResizeMode implements Mode {
//   options: ModeOptions
//   button: Button
//   picture: Picture = null
//   knobIndex: number;
//
//   constructor(options: ModeOptions) {
//     this.options = options;
//     this.button = (new Button()).setIcon(iconMove());
//     this.onPointerMove = this.onPointerMove.bind(this);
//     this.onPointerUp = this.onPointerUp.bind(this);
//     this.onPointerDown = this.onPointerDown.bind(this);
//     this.onPointerEnter = this.onPointerEnter.bind(this);
//     this.onPointerLeave = this.onPointerLeave.bind(this);
//   }
//
//   activate(picture: Picture) {
//     this.picture = picture;
//     const { map } = this.options;
//     const knobsLayer = picture.getKnobsLayer();
//     map.addLayer(knobsLayer);
//     this.button.setActive(true);
//     map.on('mouseenter', knobsLayer.id, this.onPointerEnter);
//     map.on('mouseleave', knobsLayer.id, this.onPointerLeave);
//     map.on('mousedown', knobsLayer.id, this.onPointerDown);
//   }
//
//   setResizeCursor(index: number) {
//     const { map } = this.options;
//     map.getCanvas().style.cursor = [1, 3].includes(index) ? Cursor.NESWResize : Cursor.NWSEResize;
//   }
//
//   deactivate() {
//     const { map } = this.options;
//     this.button.setActive(false);
//     map.getCanvas().style.cursor = Cursor.Default;
//     map.off('mousemove', onPointerMove);
//     map.off('mouseenter', knobsLayer.id, onPointerEnter);
//     map.off('mouseleave', knobsLayer.id, onPointerLeave);
//     map.off('mousedown', knobsLayer.id, onPointerDown);
//     document.removeEventListener('pointerup', onPointerUp);
//
//     if (map.getLayer(knobsLayer.id)) map.removeLayer(knobsLayer.id);
//   }
//
//   onPointerMove(event: MapMouseEvent) {
//     const pointA = map.project(picture.position[currentIndex]);
//     const pointB = map.project(picture.position[picture.getOppositePoint(currentIndex)]);
//     const pointP = map.project(event.lngLat);
//     const closestPoint = getClosestPoint([pointA.x, pointA.y], [pointB.x, pointB.y], [pointP.x, pointP.y]);
//     const closestLngLat = map.unproject(closestPoint);
//     const scaledPosition = picture.position;
//
//     scaledPosition[currentIndex] = new LngLat(closestLngLat.lng, closestLngLat.lat);
//     setResizeCursor(currentIndex);
//
//     if (currentIndex === 0) {
//       scaledPosition[1] = new LngLat(scaledPosition[1].lng, closestLngLat.lat);
//       scaledPosition[3] = new LngLat(closestLngLat.lng, scaledPosition[3].lat);
//     } else if (currentIndex === 1) {
//       scaledPosition[0] = new LngLat(scaledPosition[0].lng, closestLngLat.lat);
//       scaledPosition[2] = new LngLat(closestLngLat.lng, scaledPosition[2].lat);
//     } else if (currentIndex === 2) {
//       scaledPosition[3] = new LngLat(scaledPosition[3].lng, closestLngLat.lat);
//       scaledPosition[1] = new LngLat(closestLngLat.lng, scaledPosition[1].lat);
//     } else if (currentIndex === 3) {
//       scaledPosition[2] = new LngLat(scaledPosition[2].lng, closestLngLat.lat);
//       scaledPosition[0] = new LngLat(closestLngLat.lng, scaledPosition[0].lat);
//     }
//
//     onUpdate(scaledPosition);
//   }
//
//   onPointerUp() {
//     currentIndex = null;
//     mapCanvas.style.cursor = Cursor.Default;
//     map.off('mousemove', onPointerMove);
//     map.setLayoutProperty(knobsLayer.id, 'visibility', Visibility.Visible);
//     map.setLayoutProperty(contourLayer.id, 'visibility', Visibility.Visible);
//   }
//
//   onPointerDown(event: MapLayerMouseEvent) {
//     event.preventDefault();
//     currentIndex = event.features[0].properties.index;
//     map.on('mousemove', onPointerMove);
//     map.setLayoutProperty(knobsLayer.id, 'visibility', Visibility.None);
//     map.setLayoutProperty(contourLayer.id, 'visibility', Visibility.None);
//     document.addEventListener('pointerup', onPointerUp, { once: true });
//   }
//
//   onPointerEnter(event: MapLayerMouseEvent) {
//     setResizeCursor(event.features[0].properties.index as number);
//   }
//
//   onPointerLeave() {
//     mapCanvas.style.cursor = Cursor.Default;
//   }
// }
//
// export default ResizeMode;
