export function isMapLibre(map: { getContainer(): HTMLElement }) {
	return map.getContainer().classList.contains('maplibregl-map');
}
