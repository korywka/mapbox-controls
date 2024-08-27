export type ControlOptions = {
    getContent: (event: import("mapbox-gl").MapMouseEvent) => string;
    layer?: string;
};
