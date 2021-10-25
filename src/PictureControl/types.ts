import { CircleLayout, CirclePaint, LineLayout, LinePaint, LngLat, Map } from 'mapbox-gl';
import Button from '../Button/Button';
import Picture from './Picture';

export type PicturePosition = [LngLat, LngLat, LngLat, LngLat]

export enum Cursor {
  Default = '',
  Move = 'move',
  Grabbing = 'grabbing',
  NESWResize = 'nesw-resize',
  NWSEResize = 'nwse-resize',
}

export type OnUpdate = (position: PicturePosition) => void;

export abstract class Mode {
  map: Map
  onUpdate: OnUpdate
  button: Button
  picture?: Picture

  protected constructor(map: Map, onUpdate: OnUpdate) {
    this.map = map;
    this.onUpdate = onUpdate;
    this.button = new Button();
  }

  activate(picture: Picture) {
    this.picture = picture;
  }
  deactivate() {
    this.picture = undefined;
  }
}


export enum Visibility {
  Visible= 'visible',
  None = 'none',
}

// export interface ModeStyle {
//   moveContourLayout: LineLayout;
//   moveContourPaint: LinePaint;
//   resizeContourLayout: LineLayout;
//   resizeContourPaint: LinePaint;
//   resizeKnobLayout: CircleLayout;
//   resizeKnobPaint: CirclePaint;
// }
