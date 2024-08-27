class TooltipControl {
	/** @param {import('./types').ControlOptions} options */
	constructor(options) {
		if (typeof options.getContent !== 'function') {
			throw Error('getContent function must be defined');
		}
		this.options = { ...options };
		this.container = document.createElement('div');
		/** @type {import('mapbox-gl').MapEventType} */
		this.eventShow = this.options.layer ? 'mouseenter' : 'mouseover';
		/** @type {import('mapbox-gl').MapEventType} */
		this.eventHide = this.options.layer ? 'mouseleave' : 'mouseout';
		this.node = document.createElement('div');
		this.node.classList.add('mapbox-ctrl-tooltip');
		this.lngLat = undefined;
		this.cursorStyle = '';
	}

	show = () => {
		if (!this.map) throw Error('map is undefined');
		this.map.getContainer().appendChild(this.node);
		this.cursorStyle = this.map.getCanvas().style.cursor;
		this.map.getCanvas().style.cursor = 'pointer';
		this.map.on('move', this.updatePosition);
	};

	hide = () => {
		if (!this.map) throw Error('map is undefined');
		this.node.innerHTML = '';
		this.map.getContainer().removeChild(this.node);
		this.map.getCanvas().style.cursor = this.cursorStyle;
		this.map.off('move', this.updatePosition);
	};

	/** @param {import('mapbox-gl').MapMouseEvent} event */
	move = (event) => {
		this.node.innerHTML = this.options.getContent(event);
		this.lngLat = event.lngLat;
		this.updatePosition();
	};

	updatePosition = () => {
		if (!this.lngLat) return;
		if (!this.map) throw Error('map is undefined');
		const pos = this.map.project(this.lngLat);
		this.node.style.left = `${pos.x}px`;
		this.node.style.top = `${pos.y}px`;
	};

	/**
	 * @param {import('mapbox-gl').Map} map
	 * @returns {HTMLElement}
	 */
	onAdd(map) {
		this.map = map;
		if (this.options.layer) {
			this.map.on(this.eventShow, this.options.layer, this.show);
			this.map.on('mousemove', this.options.layer, this.move);
			this.map.on(this.eventHide, this.options.layer, this.hide);
		} else {
			this.map.on(this.eventShow, this.show);
			this.map.on('mousemove', this.move);
			this.map.on(this.eventHide, this.hide);
		}

		return this.container;
	}

	onRemove() {
		if (!this.map) throw Error('map is undefined');
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
		this.container.parentNode?.removeChild(this.container);
	}
}

export default TooltipControl;
