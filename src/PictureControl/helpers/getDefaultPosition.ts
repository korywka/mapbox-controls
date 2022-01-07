import { Map } from 'mapbox-gl';
import { PicturePosition } from '../types';

export function getDefaultPosition(map: Map, pictureWidth: number, pictureHeight: number) {
  if (!pictureWidth || !pictureHeight) throw Error('image is not loaded');
  const padding = 20;
  const mapCanvas = map.getCanvas();
  const canvasWidth = mapCanvas.offsetWidth;
  const canvasHeight = mapCanvas.offsetHeight;
  const maxWidth = canvasWidth - padding * 2;
  const maxHeight = canvasHeight - padding * 2;
  const ratio = Math.min(maxWidth / pictureWidth, maxHeight / pictureHeight);
  const resizeWidth = pictureWidth * ratio;
  const resizeHeight = pictureHeight * ratio;
  const result: Array<[number, number]> = [
    [canvasWidth / 2 - resizeWidth / 2, canvasHeight / 2 - resizeHeight / 2], // left top
    [canvasWidth / 2 + resizeWidth / 2, canvasHeight / 2 - resizeHeight / 2], // right top
    [canvasWidth / 2 + resizeWidth / 2, canvasHeight / 2 + resizeHeight / 2], // right bottom
    [canvasWidth / 2 - resizeWidth / 2, canvasHeight / 2 + resizeHeight / 2], // left bottom
  ];
  map.setPitch(0); // reset pitch for correct projection

  return result.map((point) => map.unproject(point)) as PicturePosition;
}
