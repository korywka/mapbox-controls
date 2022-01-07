import { Map, LngLat, MapLayerMouseEvent } from 'mapbox-gl';
import { BaseMode, Cursor, OnUpdate } from '../types';
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
    this.map.addLayer(this.picture.knobsLayer);
  }

  destroy() {
    this.map.removeLayer(this.picture.knobsLayer.id);
  }
}

export default RotateMode;
