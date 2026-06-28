export default class InspectControl implements IControl {
    constructor(options?: import("./types").ControlOptions);
    options: {
        console?: boolean;
    };
    container: HTMLDivElement;
    button: HTMLButtonElement;
    isActive: boolean;
    onControlButtonClick(): void;
    activate(): void;
    deactivate(): void;
    getPointFeatures(point: any): import("mapbox-gl").GeoJSONFeature[];
    showDetails(features: import("mapbox-gl").GeoJSONFeature[]): void;
    detailsNode: HTMLDivElement | undefined;
    hideDetails(): void;
    updatePosition: () => void;
    mapClickListener: (event: import("mapbox-gl").MapMouseEvent) => void;
    lngLat: import("mapbox-gl").LngLat | undefined;
    onAdd(map: import("mapbox-gl").Map): HTMLElement;
    map: import("mapbox-gl").Map | undefined;
    onRemove(): void;
}
import type { IControl } from './types';
