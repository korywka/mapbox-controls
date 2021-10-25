import { GeoJSONSource, ImageSource, MapMouseEvent } from 'mapbox-gl';
import Base from '../Base/Base';
import Button from '../Button/Button';
import iconImage from '../icons/image';
import getFileInput from './helpers/getFileInput';
import { Mode, PicturePosition } from './types';
import Picture from './Picture';
import MoveMode from './modes/MoveMode';
import ResizeMode from './modes/ResizeMode';
import { fromUrl, fromFile } from './loader';

export default class PictureControl extends Base {
  mapContainer?: HTMLElement
  pictures: Picture[] = []
  modes: Mode[] = []
  selectedMode?: Mode
  selectedPicture?: Picture

  constructor() {
    super();
    this.insert = this.insert.bind(this);
    this.redraw = this.redraw.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.keyDownListener = this.keyDownListener.bind(this);
  }

  insert() {
    this.addClassName('mapbox-control-picture');
    this.insertUpload();
    this.modes = [
      new MoveMode(this.map, position => this.update(position)),
      new ResizeMode(this.map, position => this.update(position)),
    ];
    this.modes.forEach((mode) => {
      this.addButton(mode.button.setDisabled(true));
      mode.button.onClick(() => this.activateMode(mode));
    });
  }

  insertUpload() {
    const fileInput = getFileInput();
    const button = new Button();
    button.setIcon(iconImage());

    button.onClick(() => fileInput.click());
    fileInput.addEventListener('change', () => {
      this.deselectPicture();
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
    this.map.addSource(picture.pointsSource.id, picture.pointsSource.source);
    this.map.addLayer(picture.rasterLayer);
    this.map.addLayer(picture.fillLayer);
  }

  redraw() {
    this.deselectPicture();
    this.pictures.forEach(picture => this.drawPicture(picture));
  }

  onMapClick(event: MapMouseEvent) {
    const pictureFillLayersId = this.pictures.map(p => p.fillLayer.id);
    const features = this.map.queryRenderedFeatures(event.point, { layers: pictureFillLayersId });
    if (features.length) {
      this.selectPicture(features[0].properties?.id as string);
    } else {
      this.deselectPicture();
    }
  }

  selectPicture(pictureId: string) {
    if (this.selectedPicture?.id === pictureId) return;
    if (this.selectedPicture?.id !== pictureId) this.deselectPicture();
    const pictureToSelect = this.pictures.find(p => p.id === pictureId)!;
    if (pictureToSelect.locked) return;
    this.selectedPicture = pictureToSelect;
    this.modes.forEach(mode => mode.button.setDisabled(false));
    this.map.addLayer(this.selectedPicture.getContourLayer());
    this.map.fire('picture.select', this.selectedPicture);
    document.addEventListener('keydown', this.keyDownListener);
  }

  deselectPicture() {
    this.deactivateMode();
    if (!this.selectedPicture) return;
    this.map.removeLayer(this.selectedPicture.getContourLayer().id);
    this.map.fire('picture.deselect', this.selectedPicture);
    this.selectedPicture = undefined;
    this.modes.forEach(mode => mode.button.setDisabled(true));
    document.removeEventListener('keydown', this.keyDownListener);
  }

  activateMode(mode: Mode) {
    if (!this.selectedPicture) throw Error('no picture to for active mode');
    this.deactivateMode();
    mode.activate(this.selectedPicture);
    this.selectedMode = mode;
  }

  deactivateMode() {
    if (!this.selectedMode) return;
    this.selectedMode.deactivate();
    this.selectedMode = undefined;
  }

  update(position: PicturePosition) {
    const selectedPicture = this.selectedPicture;
    if (!selectedPicture) throw Error('no picture to update');
    selectedPicture.position = position;
    (this.map.getSource(selectedPicture.imageSource.id) as ImageSource).setCoordinates(selectedPicture.coordinates);
    (this.map.getSource(selectedPicture.polygonSource.id) as GeoJSONSource).setData(selectedPicture.asPolygon);
    (this.map.getSource(selectedPicture.pointsSource.id) as GeoJSONSource).setData(selectedPicture.asPoints);
    this.map.fire('picture.update', this.selectedPicture);
  }

  setLock(pictureId: string, value: boolean) {
    const picture = this.pictures.find(i => i.id === pictureId);
    if (!picture) throw Error(`picture with id ${pictureId} doesn't exist`);
    picture.locked = value;
  }

  keyDownListener(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.deselectPicture();
    }
  }

  onAddControl() {
    this.mapContainer = this.map.getContainer();
    this.insert();
    this.map.on('style.load', this.redraw);
    this.map.on('click', this.onMapClick);
  }

  onRemoveControl() {
    this.deselectPicture();
    this.map.off('style.load', this.redraw);
    this.map.off('click', this.onMapClick);
  }
}
