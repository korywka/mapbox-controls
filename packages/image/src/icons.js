import { parseSVG } from '@mapbox-controls/helpers';

function image() {
	return parseSVG(`
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="23" height="23" fill="currentColor">
				<path d="M0 0h24v24H0V0z" fill="none"/>
				<path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/>
		</svg>
	`);
}

function move() {
	return parseSVG(`
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="23" height="23" fill="currentColor">
			<path d="M0 0h24v24H0V0z" fill="none"/>
			<path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"/>
		</svg>
	`);
}

function scale() {
	return parseSVG(`
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="23" height="23" fill="currentColor">
				<rect fill="none" height="24" width="24"/>
				<polygon points="21,11 21,3 13,3 16.29,6.29 6.29,16.29 3,13 3,21 11,21 7.71,17.71 17.71,7.71"/>
		</svg>
	`);
}

function rotate() {
	return parseSVG(`
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="23" width="23" fill="currentColor">
			<path d="M0 0h24v24H0V0z" fill="none"/>
			<path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/>
		</svg>
	`);
}

function remove() {
	return parseSVG(`
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" height="23" width="23" fill="currentColor">
			<path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
		</svg>
	`);
}

export const icons = {
	move,
	image,
	scale,
	rotate,
	remove,
};
