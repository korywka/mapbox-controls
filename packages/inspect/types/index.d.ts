export default class InspectControl {
    constructor(options?: InspectControlOptions);
    options: InspectControlOptions;
    container: HTMLDivElement;
    button: HTMLButtonElement;
    isActive: boolean;
    mapClickListener(event: MapMouseEvent): void;
    updatePosition(): void;
    activate(): void;
    deactivate(): void;
    getClickFeatures(event: MapMouseEvent): import("mapbox-gl").MapboxGeoJSONFeature[];
    showDetails(features: GeoJSONFeature[]): void;
    detailsNode: HTMLDivElement | undefined;
    hideDetails(): void;
    lngLat: import("mapbox-gl").LngLat | undefined;
    onAdd(map: import('mapbox-gl').Map): HTMLElement;
    map: import("mapbox-gl").Map | undefined;
    onRemove(): void;
}
export type GeoJSONFeature = import('mapbox-gl').MapboxGeoJSONFeature;
export type MapMouseEvent = import('mapbox-gl').MapMouseEvent;
export type BBox = [[number, number], [number, number]];
export type InspectControlOptions = {
    console?: boolean;
};
