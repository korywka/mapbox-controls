/**
 * Create mapbox control container
 * @param {string} className
 */
export function controlContainer(className) {
	const container = document.createElement('div');
	container.classList.add('mapboxgl-ctrl', 'mapboxgl-ctrl-group', className);
	return container;
}

/**
 * Create mapbox control button
 * @param {Object} options
 * @param {string=} options.title
 * @param {Node=} options.icon
 * @param {string=} options.textContent
 * @param {boolean=} options.disabled
 * @param {boolean=} options.hidden
 * @param {string=} options.className
 * @param {() => void=} options.onClick
 */
export function controlButton(options = {}) {
	const button = document.createElement('button');
	button.type = 'button';
	if (options.title) {
		button.title = options.title;
	}
	if (options.icon) {
		button.appendChild(options.icon);
	}
	if (options.textContent) {
		button.textContent = options.textContent;
	}
	if (options.disabled) {
		button.disabled = true;
	}
	if (options.hidden) {
		button.hidden = true;
	}
	if (options.className) {
		button.classList.add(options.className);
	}
	if (options.onClick) {
		button.addEventListener('click', () => {
			if (!options.onClick) return;
			options.onClick();
		});
	}
	return button;
}

/**
 * Create SVG element from string code
 * @param {string} string
 */
export function parseSVG(string) {
	return /** @type SVGElement */ ((new DOMParser().parseFromString(string, 'image/svg+xml')).firstChild);
}
