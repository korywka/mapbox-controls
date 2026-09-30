/**
 * Create SVG element from string code
 */
export function parseSVG(string: string) {
	return new DOMParser().parseFromString(string, 'image/svg+xml').firstChild as SVGElement;
}
