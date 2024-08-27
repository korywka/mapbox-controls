import { parseSVG } from '@mapbox-controls/helpers';

function ruler() {
	return parseSVG(`
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="23" height="23" fill="currentColor">
				<rect fill="none" height="24" width="24"/>
				<path d="M20,6H4C2.9,6,2,6.9,2,8v8c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M20,16H4V8h3v3c0,0.55,0.45,1,1,1h0 c0.55,0,1-0.45,1-1V8h2v3c0,0.55,0.45,1,1,1h0c0.55,0,1-0.45,1-1V8h2v3c0,0.55,0.45,1,1,1h0c0.55,0,1-0.45,1-1V8h3V16z"/>
		</svg>
	`);
}

export const icons = {
	ruler,
};
