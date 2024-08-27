export class Scale {
    constructor(map: import("mapbox-gl").Map, raster: import("../raster").Raster, onUpdate: (coordinates: import("../types").RasterCoordinates) => void);
    map: import("mapbox-gl").Map;
    raster: import("../raster").Raster;
    onUpdate: (coordinates: import("../types").RasterCoordinates) => void;
    knobIndex: number | null;
    get id(): string;
    onPointerEnter: (event: import("mapbox-gl").MapMouseEvent) => void;
    onPointerLeave: () => void;
    onPointerDown: (event: import("mapbox-gl").MapMouseEvent) => void;
    onPointerMove: (event: import("mapbox-gl").MapMouseEvent) => void;
    onPointerUp: () => void;
    destroy(): void;
}
