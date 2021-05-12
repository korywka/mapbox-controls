import { Map, MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';
import { Cursor } from './types';

interface Options {
  onMove: (MapMouseEvent) => void
  onStart?: (MapLayerMouseEvent) => void
  onEnd?: (MapMouseEvent) => void
  getHoverCursor?: (MapLayerMouseEvent) => Cursor
}

export default function draggableLayer(map: Map, layerId: string, options: Options) {
  const { onStart, onMove, onEnd, getHoverCursor } = options;
  const mapCanvas = map.getCanvas();
  let hoverCursor = Cursor.Move;

  const onPointerMove = (event: MapMouseEvent) => {
    mapCanvas.style.cursor = Cursor.Grabbing;
    onMove(event);
  };

  const onPointerUp = (event: MapMouseEvent) => {
    mapCanvas.style.cursor = hoverCursor;
    map.off('mousemove', onPointerMove);
    if (onEnd) onEnd(event);
  };

  const onPointerDown = (event: MapLayerMouseEvent) => {
    event.preventDefault();
    mapCanvas.style.cursor = Cursor.Grabbing;
    map.on('mousemove', onPointerMove);
    map.once('mouseup', onPointerUp);
    if (onStart) onStart(event);
  };

  const onPointerEnter = (event: MapLayerMouseEvent) => {
    if (getHoverCursor) {
      hoverCursor = getHoverCursor(event);
    }
    mapCanvas.style.cursor = hoverCursor;
  };

  const onPointerLeave = () => {
    mapCanvas.style.cursor = Cursor.Default;
  };

  map.on('mouseenter', layerId, onPointerEnter);
  map.on('mouseleave', layerId, onPointerLeave);
  map.on('mousedown', layerId, onPointerDown);

  return () => {
    mapCanvas.style.cursor = Cursor.Default;
    map.off('mouseenter', layerId, onPointerEnter);
    map.off('mouseleave', layerId, onPointerLeave);
    map.off('mousedown', layerId, onPointerDown);
    map.off('mousemove', onPointerMove);
  };
}
