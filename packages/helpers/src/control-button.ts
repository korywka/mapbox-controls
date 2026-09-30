export interface ControlButtonOptions {
	title?: string;
	icon?: Node;
	textContent?: string;
	disabled?: boolean;
	hidden?: boolean;
	className?: string;
	onClick?: () => void;
}

/**
 * Create control button
 */
export function controlButton(options: ControlButtonOptions = {}) {
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
