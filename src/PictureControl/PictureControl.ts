import { GeoJSONSource, ImageSource, MapMouseEvent } from 'mapbox-gl';
import Base from '../Base/Base';
import Button from '../Button/Button';
import iconImage from '../icons/image';
import iconMove from '../icons/move';
import iconResize from '../icons/resize';
import getFileInput from '../helpers/getFileInput';
import { PicturePosition } from './types';
import Picture from './Picture';
import MoveMode from './modes/MoveMode';
import ResizeMode from './modes/ResizeMode';

export default class PictureControl extends Base {
  buttonUpload: Button
  buttonMove: Button
  buttonResize: Button
  buttonRotate: Button
  mapContainer: HTMLElement
  fileInput: HTMLInputElement
  pictures: Picture[]
  currentMode: null | MoveMode | ResizeMode
  selectedPicture?: Picture

  constructor() {
    super();
    this.buttonUpload = new Button();
    this.buttonMove = new Button();
    this.buttonResize = new Button();
    this.fileInput = getFileInput();
    this.pictures = [];
    this.currentMode = null;
    this.selectedPicture = null;
    this.insert = this.insert.bind(this);
    this.redraw = this.redraw.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.setMoveMode = this.setMoveMode.bind(this);
    this.setResizeMode = this.setResizeMode.bind(this);
    this.keyDownListener = this.keyDownListener.bind(this);
    this.onFileInputChange = this.onFileInputChange.bind(this);
  }

  insert() {
    this.addClassName('mapbox-control-picture');
    this.buttonUpload.setIcon(iconImage());
    this.buttonMove.setIcon(iconMove()).setDisabled(true).onClick(this.setMoveMode);
    this.buttonResize.setIcon(iconResize()).setDisabled(true).onClick(this.setResizeMode);
    this.addButton(this.buttonUpload, this.buttonMove, this.buttonResize);
    this.node.appendChild(this.fileInput);
    this.buttonUpload.onClick(() => this.fileInput.click());
    this.fileInput.addEventListener('change', this.onFileInputChange);
  }

  onFileInputChange() {
    this.deselectPicture();
    Array.from(this.fileInput.files).forEach(async (file) => {
      await this.addPicture(file);
    });
  }

  async addPicture(data: File | string, options: { position?: PicturePosition } = {}): Promise<Picture> {
    const picture = new Picture();
    if (typeof data === 'string') {
      await picture.loadUrl(data);
    } else if (data) {
      await picture.loadFile(data);
    } else {
      throw Error('file or url is required');
    }
    if (options.position) {
      picture.position = options.position;
    } else {
      picture.setInitialPosition(this.map);
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
      this.selectPicture(features[0].properties.id as string);
    } else {
      this.deselectPicture();
    }
  }

  selectPicture(pictureId: string) {
    if (this.selectedPicture?.id === pictureId) return;
    if (this.selectedPicture?.id !== pictureId) this.deselectPicture();
    const selectedPicture = this.pictures.find(p => p.id === pictureId);
    if (selectedPicture.locked) return;
    if (this.currentMode) this.currentMode.destroy();

    this.selectedPicture = selectedPicture;
    this.buttonMove.setDisabled(false);
    this.buttonResize.setDisabled(false);

    this.map.addLayer(this.selectedPicture.getContourLayer());
    this.map.fire('picture.select', this.selectedPicture);
    document.addEventListener('keydown', this.keyDownListener);
  }

  deselectPicture() {
    if (this.currentMode) this.currentMode.destroy();
    if (!this.selectedPicture) return;
    this.map.removeLayer(this.selectedPicture.getContourLayer().id);
    this.map.fire('picture.deselect', this.selectedPicture);
    this.selectedPicture = null;
    this.buttonMove.setDisabled(true);
    this.buttonResize.setDisabled(true);
    document.removeEventListener('keydown', this.keyDownListener);
  }

  setPositionToPictureSource(position: PicturePosition) {
    const selectedPicture = this.selectedPicture;
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

  setMoveMode() {
    if (this.currentMode && this.currentMode.name !== 'move') this.currentMode.destroy();
    this.currentMode = new MoveMode({
      button: this.buttonMove,
      map: this.map,
      picture: this.selectedPicture,
      onUpdate: position => this.setPositionToPictureSource(position),
    });
  }

  setResizeMode() {
    if (this.currentMode && this.currentMode.name !== 'resize') this.currentMode.destroy();
    this.currentMode = new ResizeMode({
      button: this.buttonResize,
      map: this.map,
      picture: this.selectedPicture,
      onUpdate: position => this.setPositionToPictureSource(position),
    });
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
