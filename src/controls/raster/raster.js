import Base from '../../base/base.js';
import iconImage from '../../icons/js/image.js';
import { fromFile, fromUrl } from './loaders.js';
import { moveMode } from './modes/move.js';

/** @typedef {import('mapbox-gl').ImageSource} ImageSource */
/** @typedef {import('mapbox-gl').GeoJSONSource} GeoJSONSource */

export default class Picture extends Base {
  /**
   * @param {import('../../types').RasterOptions=} options
   */
  constructor(options) {
    super(options);
    /** @type {import('./picture').default[]} */
    this.pictures = [];
    /** @type {string | null} */
    this.selectedPictureId = null;
    this.onMapClick = this.onMapClick.bind(this);
    this.updatePicture = this.updatePicture.bind(this);
  }

  addUploadButton() {
    const fileInput = Picture.fileInputNode();
    const button = Picture.createButton({
      icon: iconImage(),
      title: this.strings.addImage,
    });

    button.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', () => {
      if (!fileInput.files) return;
      Array.from(fileInput.files).forEach(async (file) => {
        await this.addPicture(file);
      });
    });

    this.node.appendChild(fileInput);
    this.addButton(button);
  }

  /**
   * @param {File | string} data
   * @param {import('../../types').RasterPicturePosition=} position
   * @return {Promise<import('./picture').default>}
   */
  async addPicture(data, position) {
    /** @type {import('./picture').default} */
    let picture;
    if (typeof data === 'string') {
      picture = await fromUrl(this.map, data);
    } else if (data) {
      picture = await fromFile(this.map, data);
    } else {
      throw Error('file or url is required');
    }
    if (position) {
      picture.position = position;
    }
    this.pictures.push(picture);
    this.drawPicture(picture);
    this.map.fire('picture.add', picture);

    return picture;
  }

  /**
   * @param {import('./picture').default} picture
   */
  drawPicture(picture) {
    this.map.addSource(picture.imageSourceId, picture.imageSource);
    this.map.addSource(picture.polygonSourceId, picture.polygonSource);
    this.map.addLayer(picture.rasterLayer);
    this.map.addLayer(picture.fillLayer);
  }

  /**
   * @param {import('mapbox-gl').MapMouseEvent} event
   */
  onMapClick(event) {
    const fillLayersId = this.pictures.map((p) => p.fillLayer.id);
    const features = this.map.queryRenderedFeatures(event.point, { layers: fillLayersId });
    if (features.length) {
      this.selectPicture(features[0].properties?.id);
    } else if (this.selectedPictureId) {
      // add extra padding for outside click to not deselect on knobs click
      const padding = 10;
      const { x, y } = event.point;
      const bbox = /** @type {import('../../types').BBox} */([[x - padding, y - padding], [x + padding, y + padding]]);
      const features = this.map.queryRenderedFeatures(bbox, { layers: fillLayersId });
      if (!features.length) {
        this.deselectPicture();
      }
    }
  }

  /**
   * @param {string} id
   * @return {import('./picture').default}
   */
  getPictureById(id) {
    const picture = this.pictures.find((p) => p.id === id);
    if (!picture) throw Error(`picture with id ${id} doesn't exist`);

    return picture;
  }

  /**
   * @param {string} pictureId
   */
  selectPicture(pictureId) {
    const picture = this.getPictureById(pictureId);
    if (picture.locked || this.selectedPictureId === pictureId) return;
    if (this.selectedPictureId !== pictureId) {
      this.deselectPicture(); // selected new picture, so deselect previous one
    }
    this.selectedPictureId = pictureId;
    this.map.addLayer(picture.contourLayer);
    this.map.fire('picture.select', picture);
    moveMode(this.map, picture, this.updatePicture);
    // this.buttons.forEach((button) => button.setDisabled(false));
    // document.addEventListener('keydown', this.keyDownListener);
  }

  deselectPicture() {
    if (!this.selectedPictureId) return;
    const picture = this.getPictureById(this.selectedPictureId);
    this.map.removeLayer(picture.contourLayer.id);
    this.map.fire('picture.deselect', picture);
    this.selectedPictureId = null;
  }

  /**
   * @param {import('../../types').RasterPicturePosition} position
   */
  updatePicture(position) {
    console.log('called');
    if (!this.selectedPictureId) throw Error('no picture to update');
    const selectedPicture = this.getPictureById(this.selectedPictureId);
    const imageSource = /** @type {ImageSource} */ (this.map.getSource(selectedPicture.imageSourceId));
    const polygonSource = /** @type {GeoJSONSource} */ (this.map.getSource(selectedPicture.polygonSourceId));
    selectedPicture.position = position;
    imageSource.setCoordinates(selectedPicture.coordinates);
    polygonSource.setData(selectedPicture.asPolygonGeometry);
    this.map.fire('picture.update', selectedPicture);
  }

  static fileInputNode() {
    const node = document.createElement('input');
    node.type = 'file';
    node.accept = '.jpg, .jpeg, .png';
    node.multiple = true;

    return node;
  }

  $onAdd() {
    this.node.classList.add('mapbox-control-raster');
    this.addUploadButton();
    this.map.on('click', this.onMapClick);
  }

  $onRemove() {
    this.map.off('click', this.onMapClick);
  }
}
