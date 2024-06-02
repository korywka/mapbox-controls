export default class RulerControl {
    constructor(options?: RulerControlOptions);
    options: RulerControlOptions;
    container: HTMLDivElement;
    isActive: boolean;
    coordinates: [number, number][];
    button: HTMLButtonElement | null;
    removeDragEvents: (() => void) | null;
    onControlButtonClick(): void;
    draw: () => void;
    activate(): void;
    deactivate(): void;
    mapClickListener: (event: import('mapbox-gl').MapMouseEvent) => void;
    addCoordinate(coordinate: [number, number]): void;
    updateSource(): void;
    addDragEvents(): void;
    onAdd(map: import('mapbox-gl').Map): HTMLElement;
    map: import("mapbox-gl").Map | undefined;
    onRemove(): void;
}
export type RulerControlOptions = {
    units?: import('@turf/helpers').Units;
    labelFormat?: (n: number) => string;
    lineLayout?: import('mapbox-gl').LineLayout;
    linePaint?: import('mapbox-gl').LinePaint;
    markerLayout?: import('mapbox-gl').CircleLayout;
    markerPaint?: import('mapbox-gl').CirclePaint;
    labelLayout?: import('mapbox-gl').SymbolLayout;
    labelPaint?: import('mapbox-gl').SymbolPaint;
    invisible?: boolean;
};
