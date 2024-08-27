import { parseSVG } from '@mapbox-controls/helpers';

function plus() {
	return parseSVG(`
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="23" height="23" fill="currentColor">
				<rect fill="none" height="24" width="24"/>
				<path d="M18,13h-5v5c0,0.55-0.45,1-1,1l0,0c-0.55,0-1-0.45-1-1v-5H6c-0.55,0-1-0.45-1-1l0,0c0-0.55,0.45-1,1-1h5V6 c0-0.55,0.45-1,1-1l0,0c0.55,0,1,0.45,1,1v5h5c0.55,0,1,0.45,1,1l0,0C19,12.55,18.55,13,18,13z"/>
		</svg>
	`);
}

function minus() {
	return parseSVG(`
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="23" height="23" fill="currentColor">
				<rect fill="none" height="24" width="24"/>
				<path d="M18,13H6c-0.55,0-1-0.45-1-1l0,0c0-0.55,0.45-1,1-1h12c0.55,0,1,0.45,1,1l0,0C19,12.55,18.55,13,18,13z"/>
		</svg>
	`);
}

export const icons = {
	plus,
	minus,
};
