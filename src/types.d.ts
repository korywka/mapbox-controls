export type Strings = { [key: string]: string };

declare module Base {
    export interface Options {
        strings?: Strings
    }

    export interface Button {
        icon?: SVGElement
        text?: string
        title?: string
    }
}

declare module Compass {
    export interface Options extends Base.Options {
        instant?: boolean
    }
}

declare module Inspect {
    export interface Options extends Base.Options {
        console?: boolean
    }
}

declare module Language {
    export interface Options {
        supportedLanguages?: string[]
        language?: string
        getLanguageKey?: (language: string) => string
        excludedLayerIds?: string[]
    }

    export type TextField = string | import('mapbox-gl').StyleFunction | import('mapbox-gl').Expression;
}

declare module Ruler {
    export interface Options extends Base.Options {
        units?: import('@turf/helpers').Units
        labelFormat: (n: number) => string
        markerLayout: import('mapbox-gl').SymbolLayout
        markerPaint: import('mapbox-gl').SymbolLayout
        markerCSS: Partial<CSSStyleDeclaration>
        lineLayout: import('mapbox-gl').LineLayout
        linePaint: import('mapbox-gl').LinePaint
    }
}

declare module Styles {
    type Style = {
        label: string
        styleName: string
        styleUrl: string
    };

    export interface Options {
        styles?: Style[]
        onChange?: (style: Style) => void
    }
}

declare module Tooltip {
    export interface Options {
        getContent: (event: import('mapbox-gl').MapMouseEvent) => string
        layer?: string
    }
}

declare module Zoom {
    export interface Options extends Base.Options {
    }
}

declare module Raster {
    export interface Options extends Base.Options {
    }

    export type BBox = [import('mapbox-gl').PointLike, import('mapbox-gl').PointLike];

    export type Polygon = import('geojson').Feature<import('geojson').Polygon>;

    export type Points = import('geojson').FeatureCollection<import('geojson').Point>;

    export type Position = [[number, number], [number, number], [number, number], [number, number]];

    export interface PictureOptions {
        id: string
        url: string
        width: number
        height: number
        position: Position
    }
}


// import { LngLat, PointLike } from 'mapbox-gl';
// import { FeatureCollection, Point, Polygon } from 'geojson';
//
//
//
// export type PolygonsGeometry = FeatureCollection<Polygon>;
//
// export type PointsGeometry = FeatureCollection<Point>;
//
// export type BBox = [PointLike, PointLike];
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// export interface RasterOptions extends BaseOptions {
// }
//
// export type RasterPicturePosition = [LngLat, LngLat, LngLat, LngLat];
//
// export interface RasterPictureOptions {
//     id: string
//     url: string
//     width: number
//     height: number
//     position: RasterPicturePosition
// }
