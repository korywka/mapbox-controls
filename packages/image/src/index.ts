import type { GeoJSONSource, ImageSource, Map, MapMouseEvent } from 'mapbox-gl';
import { Control, controlButton } from '@mapbox-controls/helpers';
import { icons } from './icons.js';
import { Raster } from './raster.js';
import { Move } from './modes/move.js';
import { Scale } from './modes/scale.js';
import { Rotate } from './modes/rotate.js';
import { centerPosition } from './center-position.js';
import { createFileInput, readFile, readUrl } from './file.js';
import type { ControlOptions, RasterCoordinates } from './types.js';

class ImageControl extends Control<Map> {
	fileInput: HTMLInputElement;
	buttonAdd: HTMLButtonElement;
	buttonMove: HTMLButtonElement;
	buttonScale: HTMLButtonElement;
	buttonRotate: HTMLButtonElement;
	buttonRemove: HTMLButtonElement | undefined;
	rasters: Record<string, Raster>;
	currentRaster: Raster | null;
	currentMode: Move | Scale | Rotate | null;

	constructor(options: ControlOptions = {}) {
		super('mapgl-image');
		this.fileInput = createFileInput();
		this.buttonAdd = controlButton({
			title: 'Add image',
			icon: icons.image(),
			className: 'mapgl-image-add',
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
		this.rasters = {};
		this.currentRaster = null;
		this.currentMode = null;
	}

	async addFile(file: File, coordinates?: RasterCoordinates) {
		const image = await readFile(file);
		const id = this.addImage(image, coordinates);
		return id;
	}

	async addUrl(url: string, coordinates?: RasterCoordinates) {
		const image = await readUrl(url);
		const id = this.addImage(image, coordinates);
		return id;
	}

	async addImage(image: HTMLImageElement, coordinates?: RasterCoordinates) {
		const position = coordinates ?? centerPosition(image, this.map);
		const raster = new Raster(image, position);
		this.addRaster(raster);
		return raster.id;
	}

	addRaster(raster: Raster) {
		this.rasters[raster.id] = raster;
		this.map.addSource(raster.rasterSource.id, raster.rasterSource.source);
		this.map.addSource(raster.polygonSource.id, raster.polygonSource.source);
		this.map.addSource(raster.pointsSource.id, raster.pointsSource.source);
		this.map.addLayer(raster.rasterLayer);
		this.map.addLayer(raster.fillLayer);
		this.map.fire('image.add', { id: raster.id });
	}

	removeRaster() {
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
		this.map.fire('image.remove', { id: raster.id });
	}

	selectRaster(id: string) {
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
		this.map.fire('image.select', { id: this.currentRaster.id });
	}

	deselectRaster() {
		if (!this.currentRaster) return;
		this.map.removeLayer(this.currentRaster.contourLayer.id);
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

	setMode(mode: 'move' | 'scale' | 'rotate' | null) {
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

	updateCoordinates(coordinates: RasterCoordinates) {
		if (!this.currentRaster) throw Error('no raster is selected');
		const raster = this.currentRaster;
		raster.coordinates = coordinates;
		const rasterSource = this.map.getSource(raster.rasterSource.id) as ImageSource;
		const polygonSource = this.map.getSource(raster.polygonSource.id) as GeoJSONSource;
		const pointsSource = this.map.getSource(raster.pointsSource.id) as GeoJSONSource;
		rasterSource.setCoordinates(raster.coordinates);
		polygonSource.setData(raster.polygonSource.source.data);
		pointsSource.setData(raster.pointsSource.source.data);
		this.map.fire('image.update', { coordinates });
	}

	onMapClick = (event: MapMouseEvent) => {
		const layersId = Object.values(this.rasters).map((i) => i.fillLayer.id);
		// sometimes layers are removed from the map without destroying the control, e.g. style was changed
		const errorLayerId = layersId.find((id) => {
			return !this.map.getLayer(id);
		});
		if (errorLayerId) {
			return;
		}
		const features = this.map.queryRenderedFeatures(event.point, { layers: layersId });
		if (features[0]) {
			const id: string = features[0].properties?.id;
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
			const bbox: [[number, number], [number, number]] = [
				[x - padding, y - padding],
				[x + padding, y + padding],
			];
			const features = this.map.queryRenderedFeatures(bbox, { layers: layersId });
			if (!features.length) {
				this.deselectRaster();
			}
		}
	};

	setLock = (id: string, isLocked: boolean) => {
		this.rasters[id].locked = isLocked;
		if (this.currentRaster?.id === id && isLocked) {
			this.deselectRaster();
		}
	};

	protected mount() {
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
	}

	protected unmount() {
		this.map.off('click', this.onMapClick);
	}
}

export default ImageControl;
