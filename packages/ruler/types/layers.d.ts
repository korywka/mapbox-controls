export const layers: Layers;
export type Layers = {
    line: import('mapbox-gl').LineLayer;
    markers: import('mapbox-gl').CircleLayer;
    labels: import('mapbox-gl').SymbolLayer;
};
