import { LngLat } from 'mapbox-gl';

export type ImagePosition = [LngLat, LngLat, LngLat, LngLat]

export enum Cursor {
  Default = '',
  Move = 'move',
  Grabbing = 'grabbing',
  NESWResize = 'nesw-resize',
  NWSEResize = 'nwse-resize',
}

export enum EditMode {
  None= 'none',
  Move= 'move',
  Transform = 'transform',
}

export enum Visibility {
  Visible= 'visible',
  None = 'none',
}
