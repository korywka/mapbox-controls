export const layers: Layers;
export type Layers = {
    line: import("mapbox-gl").LineLayerSpecification;
    markers: import("mapbox-gl").CircleLayerSpecification;
    labels: import("mapbox-gl").SymbolLayerSpecification;
};
