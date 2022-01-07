import { Map, LngLat } from 'mapbox-gl';
import { BaseMode, OnUpdate } from '../types';
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
    console.log('TODO');
  }

  destroy() {
  }
}

export default RotateMode;
