import type { LngLat, Map, MapEventType, MapMouseEvent } from 'mapbox-gl';
import type { ControlOptions } from './types.js';
import { Control } from '@mapbox-controls/helpers';

class TooltipControl extends Control<Map> {
	options: ControlOptions;
	eventShow: MapEventType;
	eventHide: MapEventType;
	node: HTMLDivElement;
	lngLat: LngLat | undefined;
	cursorStyle: string;

	constructor(options: ControlOptions) {
		super();
		if (typeof options.getContent !== 'function') {
			throw Error('getContent function must be defined');
		}
		this.options = { ...options };
		this.eventShow = this.options.layer ? 'mouseenter' : 'mouseover';
		this.eventHide = this.options.layer ? 'mouseleave' : 'mouseout';
		this.node = document.createElement('div');
		this.node.classList.add('mapgl-tooltip');
		this.lngLat = undefined;
		this.cursorStyle = '';
	}

	show = () => {
		this.map.getContainer().appendChild(this.node);
		this.cursorStyle = this.map.getCanvas().style.cursor;
		this.map.getCanvas().style.cursor = 'pointer';
		this.map.on('move', this.updatePosition);
	};

	hide = () => {
		this.node.innerHTML = '';
		this.node.remove();
		this.map.getCanvas().style.cursor = this.cursorStyle;
		this.map.off('move', this.updatePosition);
	};

	move = (event: MapMouseEvent) => {
		this.node.innerHTML = this.options.getContent(event);
		this.lngLat = event.lngLat;
		this.updatePosition();
	};

	updatePosition = () => {
		if (!this.lngLat) return;
		const pos = this.map.project(this.lngLat);
		this.node.style.left = `${pos.x}px`;
		this.node.style.top = `${pos.y}px`;
	};

	protected mount() {
		if (this.options.layer) {
			this.map.on(this.eventShow, this.options.layer, this.show);
			this.map.on('mousemove', this.options.layer, this.move);
			this.map.on(this.eventHide, this.options.layer, this.hide);
		} else {
			this.map.on(this.eventShow, this.show);
			this.map.on('mousemove', this.move);
			this.map.on(this.eventHide, this.hide);
		}
	}

	protected unmount() {
		if (this.options.layer) {
			this.map.off(this.eventShow, this.options.layer, this.show);
			this.map.off('mousemove', this.options.layer, this.move);
			this.map.off(this.eventHide, this.options.layer, this.hide);
		} else {
			this.map.off(this.eventShow, this.show);
			this.map.off('mousemove', this.move);
			this.map.off(this.eventHide, this.hide);
		}
		this.hide();
	}
}

export default TooltipControl;
