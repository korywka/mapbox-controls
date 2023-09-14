export class Raster {
    constructor(image: HTMLImageElement, coordinates: [number, number][]);
    src: string;
    width: number;
    height: number;
    coordinates: [number, number][];
    get id(): string;
    get rasterSource(): {
        id: string;
        source: import('mapbox-gl').ImageSourceRaw;
    };
    get polygonSource(): {
        id: string;
        source: {
            type: 'geojson';
            data: import('geojson').Feature<import('geojson').Polygon>;
        };
    };
    get pointsSource(): {
        id: string;
        source: {
            type: 'geojson';
            data: import('geojson').FeatureCollection<import('geojson').Point>;
        };
    };
    get rasterLayer(): import("mapbox-gl").RasterLayer;
    get fillLayer(): import("mapbox-gl").FillLayer;
    get contourLayer(): import("mapbox-gl").LineLayer;
    get knobsLayer(): import("mapbox-gl").CircleLayer;
}
