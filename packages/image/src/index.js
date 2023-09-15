import { controlButton, controlContainer } from '@mapbox-controls/helpers';
import { createFileInput, readFile, readUrl } from './file.js';
import { centerPosition } from './center-position.js';
import { Rotate } from './modes/rotate.js';
import { Scale } from './modes/scale.js';
import { Move } from './modes/move.js';
import { Raster } from './raster.js';
import { icons } from './icons.js';

class ImageControl {
	constructor() {
		this.container = controlContainer('mapbox-ctrl-image');
		this.fileInput = createFileInput();
		this.buttonAdd = controlButton({
			title: 'Add image',
			icon: icons.image,
			className: 'mapbox-ctrl-image-add',
			onClick: () => this.fileInput.click(),
		});
		this.buttonMove = controlButton({
			disabled: true,
			title: 'Move image',
			icon: icons.move,
			onClick: () => this.setMode('move'),
		});
		this.buttonScale = controlButton({
			disabled: true,
			title: 'Scale image',
			icon: icons.scale,
			onClick: () => this.setMode('scale'),
		});
		this.buttonRotate = controlButton({
			disabled: true,
			title: 'Rotate image',
			icon: icons.rotate,
			onClick: () => this.setMode('rotate'),
		});
		/** @type {Record<string, Raster>} */
		this.rasters = {};
		/** @type {Raster | null} */
		this.currentRaster = null;
		/** @type {Move | Scale | Rotate | null} */
		this.currentMode = null;
	}

	/**
   * @param {File} file
	 * @param {[number, number][]=} coordinates
   */
	async addFile(file, coordinates) {
		const image = await readFile(file);
		this.addImage(image, coordinates);
	}

	/**
	 * @param {string} url
	 * @param {[number, number][]=} coordinates
	 */
	async addUrl(url, coordinates) {
		const image = await readUrl(url);
		this.addImage(image, coordinates);
	}

	/**
	 * @param {HTMLImageElement} image
	 * @param {[number, number][]=} coordinates
	 */
	async addImage(image, coordinates) {
		if (!this.map) throw Error('map is undefined');
		const position = coordinates ?? centerPosition(image, this.map);
		const raster = new Raster(image, position);
		this.rasters[raster.id] = raster;
		this.addRaster(raster);
	}

	/**
   * @param {Raster} raster
   */
	addRaster(raster) {
		if (!this.map) throw Error('map is undefined');
		this.map.addSource(raster.rasterSource.id, raster.rasterSource.source);
		this.map.addSource(raster.polygonSource.id, raster.polygonSource.source);
		this.map.addSource(raster.pointsSource.id, raster.pointsSource.source);
		this.map.addLayer(raster.rasterLayer);
		this.map.addLayer(raster.fillLayer);
	}

	/**
   * @param {string} id
   */
	selectRaster(id) {
		if (!this.map) throw Error('map is undefined');
		this.deselectRaster();
		this.currentRaster = this.rasters[id];
		this.map.addLayer(this.currentRaster.contourLayer);
		this.buttonMove.disabled = false;
		this.buttonScale.disabled = false;
		this.buttonRotate.disabled = false;
		this.map.fire('image.select', { id: this.currentRaster.id });
	}

	deselectRaster() {
		if (!this.map) throw Error('map is undefined');
		if (!this.currentRaster) return;
		this.map.removeLayer(this.currentRaster.contourLayer.id);
		this.map.fire('image.deselect', { id: this.currentRaster.id });
		this.setMode(null);
		this.currentRaster = null;
		this.buttonMove.disabled = true;
		this.buttonScale.disabled = true;
		this.buttonRotate.disabled = true;
	}

	/**
   * @param {'move' | 'scale' | 'rotate' | null} mode
   */
	setMode(mode) {
		if (!this.map) throw Error('map is undefined');
		if (!this.currentRaster) throw Error('no raster is selected');
		if (this.currentMode) {
			const currentId = this.currentMode.id;
			this.buttonMove.classList.remove('-active');
			this.buttonScale.classList.remove('-active');
			this.buttonRotate.classList.remove('-active');
			this.currentMode.destroy();
			this.currentMode = null;
			this.map.fire('image.mode', { mode: this.currentMode });
			// click on active button just deactivates current mode
			if (currentId === mode) return;
		}
		if (mode === 'move') {
			this.buttonMove.classList.add('-active');
			this.currentMode = new Move(this.map, this.currentRaster, (coordinates) => {
				this.updateCoordinates(coordinates);
			});
		}
		if (mode === 'scale') {
			this.buttonScale.classList.add('-active');
			this.currentMode = new Scale(this.map, this.currentRaster, (coordinates) => {
				this.updateCoordinates(coordinates);
			});
		}
		if (mode === 'rotate') {
			this.buttonRotate.classList.add('-active');
			this.currentMode = new Rotate(this.map, this.currentRaster, (coordinates) => {
				this.updateCoordinates(coordinates);
			});
		}
		if (this.currentMode) {
			this.map.fire('image.mode', { mode: this.currentMode.id });
		}
	}

	/**
	 * @typedef {import('mapbox-gl').ImageSource} ImageSource
	 * @typedef {import('mapbox-gl').GeoJSONSource} GeoJSONSource
	 * @param {[number, number][]} coordinates
	 */
	updateCoordinates(coordinates) {
		if (!this.map) throw Error('map is undefined');
		if (!this.currentRaster) throw Error('no raster is selected');
		const raster = this.currentRaster;
		raster.coordinates = coordinates;
		const rasterSource = /** @type {ImageSource} */ (this.map.getSource(raster.rasterSource.id));
		const polygonSource = /** @type {GeoJSONSource} */ (this.map.getSource(raster.polygonSource.id));
		const pointsSource = /** @type {GeoJSONSource} */ (this.map.getSource(raster.pointsSource.id));
		rasterSource.setCoordinates(raster.coordinates);
		polygonSource.setData(raster.polygonSource.source.data);
		pointsSource.setData(raster.pointsSource.source.data);
		this.map.fire('image.update', { coordinates });
	}

	/**
   * @param {import('mapbox-gl').MapMouseEvent} event
   */
	onMapClick = (event) => {
		if (!this.map) throw Error('map is undefined');
		const layersId = Object.values(this.rasters).map((i) => i.fillLayer.id);
		const features = this.map.queryRenderedFeatures(event.point, { layers: layersId });
		if (features[0]) {
			/** @type {string} */
			const id = features[0].properties?.id;
			if (!id) throw Error('id property is undefined');
			this.selectRaster(id);
			return;
		}
		if (this.currentRaster) {
			// add extra padding to not deselect raster on it's knobs layer click
			let padding = 0;
			if (typeof this.currentRaster.knobsLayer.paint?.['circle-radius'] === 'number') {
				padding = this.currentRaster.knobsLayer.paint['circle-radius'] * 2;
			}
			const { x, y } = event.point;
			/** @type {[[number, number], [number, number]]} */
			const bbox = [[x - padding, y - padding], [x + padding, y + padding]];
			const features = this.map.queryRenderedFeatures(bbox, { layers: layersId });
			if (!features.length) {
				this.deselectRaster();
			}
		}
	};

	/**
   * @param {import('mapbox-gl').Map} map
   * @returns {HTMLElement}
   */
	onAdd(map) {
		this.map = map;
		this.container.appendChild(this.fileInput);
		this.container.appendChild(this.buttonAdd);
		this.container.appendChild(this.buttonMove);
		this.container.appendChild(this.buttonScale);
		this.container.appendChild(this.buttonRotate);
		this.fileInput.addEventListener('change', async () => {
			const file = this.fileInput.files?.[0];
			if (!file) return;
			await this.addFile(file);
		});
		this.map.on('click', this.onMapClick);
		return this.container;
	}

	onRemove() {
		this.map?.off('click', this.onMapClick);
		this.container.parentNode?.removeChild(this.container);
	}
}

export default ImageControl;
