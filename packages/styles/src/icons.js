import { parseSVG } from '@mapbox-controls/helpers';

function layers() {
	return parseSVG(`
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="23" height="23" fill="currentColor">
			<path d="m24 41.5-18-14 2.5-1.85L24 37.7l15.5-12.05L42 27.5Zm0-7.6-18-14 18-14 18 14Zm0-15.05Zm0 11.25 13.1-10.2L24 9.7 10.9 19.9Z"/>
		</svg>
	`);
}

export const icons = {
	layers,
};
