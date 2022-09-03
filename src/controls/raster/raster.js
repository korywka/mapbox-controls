import Base from '../../base/base.js';
import iconImage from '../../icons/js/image.js';
import { fromFile, fromUrl } from './loader.js';
import move from './modes/move.js';
import scale from './modes/scale.js';

/** @typedef {import('mapbox-gl').ImageSource} ImageSource */
/** @typedef {import('mapbox-gl').GeoJSONSource} GeoJSONSource */

export default class Picture extends Base {
  /**
   * @param {import('../../types').Raster.Options=} options
   */
  constructor(options) {
    super(options);
    /** @type {import('./picture').default[]} */
    this.pictures = [];
    /** @type {string | null} */
    this.selectedPictureId = null;
    /** @type {(() => void) | null} */
    this.cleanup = null;
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
   * @param {import('../../types').Raster.Position=} position
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
    this.map.addSource(picture.imageSource.id, picture.imageSource.data);
    this.map.addSource(picture.polygonSource.id, picture.polygonSource.data);
    this.map.addSource(picture.pointsSource.id, picture.pointsSource.data);
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
      /** @type {import('../../types').Raster.BBox} */
      const bbox = [[x - padding, y - padding], [x + padding, y + padding]];
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

    this.map.fire('picture.select', picture);
    this.cleanup = scale(this.map, picture, this.updatePicture);
    // this.buttons.forEach((button) => button.setDisabled(false));
    // document.addEventListener('keydown', this.keyDownListener);
  }

  deselectPicture() {
    if (!this.selectedPictureId) return;
    const picture = this.getPictureById(this.selectedPictureId);
    this.map.fire('picture.deselect', picture);
    this.selectedPictureId = null;
    if (this.cleanup) {
      this.cleanup();
      this.cleanup = null;
    }
  }

  /**
   * @param {import('../../types').Raster.Position} position
   */
  updatePicture(position) {
    console.log('called');
    if (!this.selectedPictureId) throw Error('no picture to update');
    const selectedPicture = this.getPictureById(this.selectedPictureId);
    const imageSource = /** @type {ImageSource} */ (this.map.getSource(selectedPicture.imageSource.id));
    const polygonSource = /** @type {GeoJSONSource} */ (this.map.getSource(selectedPicture.polygonSource.id));
    const pointsSource = /** @type {GeoJSONSource} */ (this.map.getSource(selectedPicture.pointsSource.id));
    selectedPicture.position = position;
    imageSource.setCoordinates(selectedPicture.position);
    polygonSource.setData(selectedPicture.asJSONPolygon);
    pointsSource.setData(selectedPicture.asJSONPoints);
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
