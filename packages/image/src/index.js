import { controlButton, controlContainer } from '@mapbox-controls/helpers';
import { icons } from './icons.js';
import { Raster } from './raster.js';
import { Move } from './modes/move.js';
import { Scale } from './modes/scale.js';
import { Rotate } from './modes/rotate.js';
import { centerPosition } from './center-position.js';
import { createFileInput, readFile, readUrl } from './file.js';

class ImageControl {
	/** @param {import('./types').ControlOptions} options */
	constructor(options = {}) {
		this.container = controlContainer('mapbox-ctrl-image');
		this.fileInput = createFileInput();
		this.buttonAdd = controlButton({
			title: 'Add image',
			icon: icons.image(),
			className: 'mapbox-ctrl-image-add',
			onClick: () => this.fileInput.click(),
		});
		this.buttonMove = controlButton({
			disabled: true,
			title: 'Move image',
			icon: icons.move(),
			onClick: () => this.setMode('move'),
		});
		this.buttonScale = controlButton({
			disabled: true,
			title: 'Scale image',
			icon: icons.scale(),
			onClick: () => this.setMode('scale'),
		});
		this.buttonRotate = controlButton({
			disabled: true,
			title: 'Rotate image',
			icon: icons.rotate(),
			onClick: () => this.setMode('rotate'),
		});
		if (options.removeButton) {
			this.buttonRemove = controlButton({
				hidden: true,
				title: 'Remove image',
				icon: icons.remove(),
				onClick: () => this.removeRaster(),
			});
		}
		/** @type {Record<string, Raster>} */
		this.rasters = {};
		/** @type {Raster | null} */
		this.currentRaster = null;
		/** @type {Move | Scale | Rotate | null} */
		this.currentMode = null;
	}

	/**
   * @param {File} file
	 * @param {import('./types').RasterCoordinates=} coordinates
   */
	async addFile(file, coordinates) {
		const image = await readFile(file);
		const id = this.addImage(image, coordinates);
		return id;
	}

	/**
	 * @param {string} url
	 * @param {import('./types').RasterCoordinates=} coordinates
	 */
	async addUrl(url, coordinates) {
		const image = await readUrl(url);
		const id = this.addImage(image, coordinates);
		return id;
	}

	/**
	 * @param {HTMLImageElement} image
	 * @param {import('./types').RasterCoordinates=} coordinates
	 */
	async addImage(image, coordinates) {
		if (!this.map) throw Error('map is undefined');
		const position = coordinates ?? centerPosition(image, this.map);
		const raster = new Raster(image, position);
		this.addRaster(raster);
		return raster.id;
	}

	/**
   * @param {Raster} raster
   */
	addRaster(raster) {
		if (!this.map) throw Error('map is undefined');
		this.rasters[raster.id] = raster;
		this.map.addSource(raster.rasterSource.id, raster.rasterSource.source);
		this.map.addSource(raster.polygonSource.id, raster.polygonSource.source);
		this.map.addSource(raster.pointsSource.id, raster.pointsSource.source);
		this.map.addLayer(raster.rasterLayer);
		this.map.addLayer(raster.fillLayer);
		// @ts-ignore
		this.map.fire('image.add', { id: raster.id });
	}

	removeRaster() {
		if (!this.map) throw Error('map is undefined');
		if (!this.currentRaster) throw Error('no raster is selected');
		const rasterId = this.currentRaster.id;
		const raster = this.rasters[rasterId];
		this.deselectRaster();
		delete this.rasters[rasterId];
		this.map.removeLayer(raster.rasterLayer.id);
		this.map.removeLayer(raster.fillLayer.id);
		this.map.removeSource(raster.rasterSource.id);
		this.map.removeSource(raster.polygonSource.id);
		this.map.removeSource(raster.pointsSource.id);
		// @ts-ignore
		this.map.fire('image.remove', { id: raster.id });
	}

	/**
   * @param {string} id
   */
	selectRaster(id) {
		if (!this.map) throw Error('map is undefined');
		this.deselectRaster();
		const raster = this.rasters[id];
		if (raster.locked) return;
		this.currentRaster = raster;
		this.map.addLayer(this.currentRaster.contourLayer);
		this.buttonMove.disabled = false;
		this.buttonScale.disabled = false;
		this.buttonRotate.disabled = false;
		if (this.buttonRemove) {
			this.buttonAdd.hidden = true;
			this.buttonRemove.hidden = false;
		}
		// @ts-ignore
		this.map.fire('image.select', { id: this.currentRaster.id });
	}

	deselectRaster() {
		if (!this.map) throw Error('map is undefined');
		if (!this.currentRaster) return;
		this.map.removeLayer(this.currentRaster.contourLayer.id);
		// @ts-ignore
		this.map.fire('image.deselect', { id: this.currentRaster.id });
		this.setMode(null);
		this.currentRaster = null;
		this.buttonMove.disabled = true;
		this.buttonScale.disabled = true;
		this.buttonRotate.disabled = true;
		if (this.buttonRemove) {
			this.buttonAdd.hidden = false;
			this.buttonRemove.hidden = true;
		}
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
			// @ts-ignore
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
			// @ts-ignore
			this.map.fire('image.mode', { mode: this.currentMode.id });
		}
	}

	/**
	 * @typedef {import('mapbox-gl').ImageSource} ImageSource
	 * @typedef {import('mapbox-gl').GeoJSONSource} GeoJSONSource
	 * @param {import('./types').RasterCoordinates} coordinates
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
		// @ts-ignore
		this.map.fire('image.update', { coordinates });
	}

	/**
   * @param {import('mapbox-gl').MapMouseEvent} event
   */
	onMapClick = (event) => {
		if (!this.map) throw Error('map is undefined');
		const layersId = Object.values(this.rasters).map((i) => i.fillLayer.id);
		// sometimes layers are removed from the map without destroying the control, e.g. style was changed
		const errorLayerId = layersId.find((id) => {
			return !this.map?.getLayer(id);
		});
		if (errorLayerId) {
			return;
		}
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
	 * @param {string} id
	 * @param {boolean} isLocked
	 */
	setLock = (id, isLocked) => {
		this.rasters[id].locked = isLocked;
		if (this.currentRaster?.id === id && isLocked) {
			this.deselectRaster();
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
		if (this.buttonRemove) {
			this.container.appendChild(this.buttonRemove);
		}
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
