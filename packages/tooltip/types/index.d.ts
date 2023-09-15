export default TooltipControl;
export type MapMouseEvent = import('mapbox-gl').MapMouseEvent;
export type MapLayerEventType = import('mapbox-gl').MapLayerEventType;
export type TooltipControlOptions = {
    getContent: (event: MapMouseEvent) => string;
    layer?: string | undefined;
};
declare class TooltipControl {
    constructor(options: TooltipControlOptions);
    options: {
        getContent: (event: MapMouseEvent) => string;
        layer?: string | undefined;
    };
    container: HTMLDivElement;
    eventShow: keyof MapLayerEventType;
    eventHide: keyof MapLayerEventType;
    node: HTMLDivElement;
    lngLat: import("mapbox-gl").LngLat | undefined;
    cursorStyle: string;
    show: () => void;
    hide: () => void;
    move: (event: MapMouseEvent) => void;
    updatePosition: () => void;
    onAdd(map: import('mapbox-gl').Map): HTMLElement;
    map: import("mapbox-gl").Map | undefined;
    onRemove(): void;
}
