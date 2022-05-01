import { GeoJSONSource, ImageSource, MapMouseEvent, PointLike } from 'mapbox-gl';
import Base from '../Base/Base';
import Button from '../Button/Button';
import iconImage from '../icons/ts/image';
import fileInputNode from './helpers/fileInputNode';
import Picture from './Picture';
import { fromUrl, fromFile } from './loader';
import { BaseMode, PicturePosition } from './types';
import { MoveMode, ResizeMode, RotateMode } from './modes';

const modes = [MoveMode, ResizeMode, RotateMode];

export default class PictureControl extends Base {
  mapContainer?: HTMLElement;
  pictures: Picture[] = [];
  buttons: Button[] = [];
  activeButton?: Button;
  activeMode?: BaseMode;
  activePicture?: Picture;

  constructor() {
    super();
    this.addClassName('mapbox-control-picture');
    this.addUpload();
    modes.forEach((mode) => {
      const button = mode.button.setDisabled(true);
      button.onClick(() => {
        this.deselectMode();
        this.selectMode(button, mode);
      });
      this.addButton(button);
      this.buttons.push(button);
    });
    this.redraw = this.redraw.bind(this);
    this.update = this.update.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.keyDownListener = this.keyDownListener.bind(this);
  }

  redraw() {
    this.deselectPicture();
    this.pictures.forEach((picture) => this.drawPicture(picture));
  }

  onMapClick(event: MapMouseEvent) {
    const pictureFillLayersId = this.pictures.map((p) => p.asFillLayer.id);
    const features = this.map.queryRenderedFeatures(event.point, { layers: pictureFillLayersId });
    if (features.length) {
      this.selectPicture(features[0].properties?.id as string);
    } else if (this.activePicture) {
      // deselect on outside click with extra padding to exclude knobs controls
      const padding = 10;
      const { x, y } = event.point;
      const bbox: [PointLike, PointLike] = [[x - padding, y - padding], [x + padding, y + padding]];
      const features = this.map.queryRenderedFeatures(bbox, { layers: pictureFillLayersId });
      if (!features.length) {
        this.deselectPicture();
      }
    }
  }

  keyDownListener(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.deselectPicture();
    }
  }

  addUpload() {
    const fileInput = fileInputNode();
    const button = new Button();
    button.setIcon(iconImage());
    button.onClick(() => fileInput.click());
    fileInput.addEventListener('change', () => {
      if (!fileInput.files) return;
      Array.from(fileInput.files).forEach(async (file) => {
        await this.addPicture(file);
      });
    });

    this.addButton(button);
    this.node.appendChild(fileInput);
  }

  async addPicture(data: File | string, options: { position?: PicturePosition } = {}): Promise<Picture> {
    let picture;
    if (typeof data === 'string') {
      picture = await fromUrl(this.map, data);
    } else if (data) {
      picture = await fromFile(this.map, data);
    } else {
      throw Error('file or url is required');
    }
    if (options.position) {
      picture.position = options.position;
    }
    this.pictures.push(picture);
    this.drawPicture(picture);
    this.map.fire('picture.add', picture);

    return picture;
  }

  drawPicture(picture: Picture) {
    this.map.addSource(picture.imageSource.id, picture.imageSource.source);
    this.map.addSource(picture.polygonSource.id, picture.polygonSource.source);
    // this.map.addSource(picture.pointsSource.id, picture.pointsSource.source);
    this.map.addLayer(picture.asRasterLayer);
    this.map.addLayer(picture.asFillLayer);
  }

  selectPicture(pictureId: string) {
    const picture = this.pictures.find((p) => p.id === pictureId)!;
    if (picture.locked) {
      return; // do not select locked picture
    }
    if (this.activePicture?.id === pictureId) {
      return; // selected the same picture
    }
    if (this.activePicture?.id !== pictureId) {
      this.deselectPicture(); // selected new picture, so deselect previous one
    }
    this.activePicture = picture;
    this.buttons.forEach((button) => button.setDisabled(false));
    this.map.addLayer(this.activePicture.asLineLayer);
    this.map.fire('picture.select', this.activePicture);
    document.addEventListener('keydown', this.keyDownListener);
  }

  deselectPicture() {
    if (!this.activePicture) return;
    this.deselectMode();
    this.map.removeLayer(this.activePicture.asLineLayer.id);
    this.map.fire('picture.deselect', this.activePicture);
    this.activePicture = undefined;
    this.buttons.forEach((button) => button.setDisabled(true));
    document.removeEventListener('keydown', this.keyDownListener);
  }

  selectMode(button: Button, ModeClass: typeof BaseMode) {
    if (!this.activePicture) {
      throw Error('no picture to for active mode');
    }
    this.activeButton = button.setActive(true);
    this.activeMode = new ModeClass(this.map, this.activePicture, this.update);
  }

  deselectMode() {
    if (this.activeMode) {
      this.activeMode.destroy();
      this.activeMode = undefined;
    }
    if (this.activeButton) {
      this.activeButton.setActive(false);
      this.activeButton = undefined;
    }
  }

  update(position: PicturePosition) {
    const selectedPicture = this.activePicture;
    if (!selectedPicture) throw Error('no picture to update');
    selectedPicture.position = position;
    (this.map.getSource(selectedPicture.imageSource.id) as ImageSource).setCoordinates(selectedPicture.coordinates);
    (this.map.getSource(selectedPicture.polygonSource.id) as GeoJSONSource).setData(selectedPicture.asPolygon);
    // (this.map.getSource(selectedPicture.pointsSource.id) as GeoJSONSource).setData(selectedPicture.asPoints);
    this.map.fire('picture.update', this.activePicture);
  }

  setLock(pictureId: string, value: boolean) {
    const picture = this.pictures.find((i) => i.id === pictureId);
    if (!picture) throw Error(`picture with id ${pictureId} doesn't exist`);
    picture.locked = value;
  }

  onAddControl() {
    this.mapContainer = this.map.getContainer();
    this.map.on('style.load', this.redraw);
    this.map.on('click', this.onMapClick);
  }

  onRemoveControl() {
    this.deselectPicture();
    this.map.off('style.load', this.redraw);
    this.map.off('click', this.onMapClick);
  }
}
