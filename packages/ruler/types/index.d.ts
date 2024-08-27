export default class RulerControl {
    constructor(options?: import("./types").ControlOptions);
    options: import("./types").ControlOptions;
    container: HTMLDivElement;
    isActive: boolean;
    coordinates: [number, number][];
    button: HTMLButtonElement | null;
    removeDragEvents: (() => void) | null;
    onControlButtonClick(): void;
    draw: () => void;
    activate(): void;
    deactivate(): void;
    mapClickListener: (event: import("mapbox-gl").MapMouseEvent) => void;
    addCoordinate(coordinate: [number, number]): void;
    updateSource(): void;
    addDragEvents(): void;
    onAdd(map: import("mapbox-gl").Map): HTMLElement;
    map: import("mapbox-gl").Map | undefined;
    onRemove(): void;
}
