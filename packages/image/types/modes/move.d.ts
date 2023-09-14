export class Move {
    constructor(map: import('mapbox-gl').Map, raster: import('../raster').Raster, onUpdate: (coordinates: [number, number][]) => void);
    map: import("mapbox-gl").Map;
    raster: import("../raster").Raster;
    onUpdate: (coordinates: [number, number][]) => void;
    prevPosition: import('geojson').Position | null;
    get id(): string;
    onPointerEnter: () => void;
    onPointerLeave: () => void;
    onPointerDown: (event: import('mapbox-gl').MapLayerMouseEvent) => void;
    onPointerMove: (event: import('mapbox-gl').MapMouseEvent) => void;
    onPointerUp: () => void;
    destroy(): void;
}
