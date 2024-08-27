export class Raster {
    constructor(image: HTMLImageElement, coordinates: import("./types").RasterCoordinates);
    src: string;
    width: number;
    height: number;
    coordinates: import("./types").RasterCoordinates;
    locked: boolean;
    get id(): string;
    get rasterSource(): {
        id: string;
        source: import("mapbox-gl").ImageSourceSpecification;
    };
    get polygonSource(): {
        id: string;
        source: {
            type: "geojson";
            data: import("geojson").Feature<import("geojson").Polygon>;
        };
    };
    get pointsSource(): {
        id: string;
        source: {
            type: "geojson";
            data: import("geojson").FeatureCollection<import("geojson").Point>;
        };
    };
    get rasterLayer(): import("mapbox-gl").RasterLayerSpecification;
    get fillLayer(): import("mapbox-gl").FillLayerSpecification;
    get contourLayer(): import("mapbox-gl").LineLayerSpecification;
    get knobsLayer(): import("mapbox-gl").CircleLayerSpecification;
}
