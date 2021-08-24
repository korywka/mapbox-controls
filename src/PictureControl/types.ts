import { LngLat, Map } from 'mapbox-gl';
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

export interface ModeOptions {
  button: Button
  map: Map
  picture: Picture
  onUpdate: (position: PicturePosition) => void
}

export enum Visibility {
  Visible= 'visible',
  None = 'none',
}
