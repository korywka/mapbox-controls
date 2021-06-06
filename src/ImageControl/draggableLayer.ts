import { Map, MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';

interface Options {
  onMove: (MapMouseEvent) => void
  onStart?: (MapLayerMouseEvent) => void
  onEnd?: (MapMouseEvent) => void
  onPointerEnter?: (MapLayerMouseEvent) => void
  onPointerLeave?: () => void
}

export default function draggableLayer(map: Map, layerId: string, options: Options) {
  const { onStart, onMove, onEnd, onPointerEnter, onPointerLeave } = options;

  const pointerMoveListener = (event: MapMouseEvent) => onMove(event);

  const pointerUpListener = (event: MapMouseEvent) => {
    map.off('mousemove', pointerMoveListener);
    if (onEnd) onEnd(event);
  };

  const onPointerDownListener = (event: MapLayerMouseEvent) => {
    event.preventDefault();
    map.on('mousemove', pointerMoveListener);
    map.once('mouseup', pointerUpListener);
    if (onStart) onStart(event);
  };

  const pointerEnterListener = (event: MapLayerMouseEvent) => {
    if (onPointerEnter) onPointerEnter(event);
  };

  const pointerLeaveListener = () => {
    if (onPointerLeave) onPointerLeave();
  };

  map.on('mouseenter', layerId, pointerEnterListener);
  map.on('mouseleave', layerId, pointerLeaveListener);
  map.on('mousedown', layerId, onPointerDownListener);

  return () => {
    map.off('mouseenter', layerId, pointerEnterListener);
    map.off('mouseleave', layerId, pointerLeaveListener);
    map.off('mousedown', layerId, onPointerDownListener);
    map.off('mousemove', pointerMoveListener);
  };
}
