export class Move {
    constructor(map: import("mapbox-gl").Map, raster: import("../raster").Raster, onUpdate: (coordinates: import("../types").RasterCoordinates) => void);
    map: import("mapbox-gl").Map;
    raster: import("../raster").Raster;
    onUpdate: (coordinates: import("../types").RasterCoordinates) => void;
    prevPosition: [number, number] | null;
    get id(): string;
    onPointerEnter: () => void;
    onPointerLeave: () => void;
    onPointerDown: (event: import("mapbox-gl").MapMouseEvent) => void;
    onPointerMove: (event: import("mapbox-gl").MapMouseEvent) => void;
    onPointerUp: () => void;
    destroy(): void;
}
