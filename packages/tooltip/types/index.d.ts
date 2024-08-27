export default TooltipControl;
declare class TooltipControl {
    constructor(options: import("./types").ControlOptions);
    options: {
        getContent: (event: import("mapbox-gl").MapMouseEvent) => string;
        layer?: string;
    };
    container: HTMLDivElement;
    eventShow: import("mapbox-gl").MapEventType;
    eventHide: import("mapbox-gl").MapEventType;
    node: HTMLDivElement;
    lngLat: import("mapbox-gl").LngLat | undefined;
    cursorStyle: string;
    show: () => void;
    hide: () => void;
    move: (event: import("mapbox-gl").MapMouseEvent) => void;
    updatePosition: () => void;
    onAdd(map: import("mapbox-gl").Map): HTMLElement;
    map: import("mapbox-gl").Map | undefined;
    onRemove(): void;
}
