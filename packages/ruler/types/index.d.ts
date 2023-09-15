export default class RulerControl {
    constructor(options?: RulerControlOptions);
    options: {
        units: import("@turf/helpers").Units;
        labelFormat: (n: number) => string;
        symbolLayout?: mapboxgl.SymbolLayout | undefined;
        symbolPaint?: mapboxgl.SymbolPaint | undefined;
        lineLayout?: mapboxgl.LineLayout | undefined;
        linePaint?: mapboxgl.LinePaint | undefined;
        markerCSS?: Partial<CSSStyleDeclaration> | undefined;
        invisible?: boolean | undefined;
    };
    container: HTMLDivElement;
    isActive: boolean;
    coordinates: [number, number][];
    markers: import('mapbox-gl').Marker[];
    button: HTMLButtonElement | null;
    onControlButtonClick(): void;
    draw: () => void;
    activate(): void;
    deactivate(): void;
    mapClickListener: (event: import('mapbox-gl').MapMouseEvent) => void;
    addCoordinate(coordinate: [number, number]): void;
    updateSource(): void;
    newMarkerElement(): HTMLDivElement;
    asLine(): import('geojson').Feature<import('geojson').LineString>;
    asPoints(): import('geojson').FeatureCollection<import('geojson').Point>;
    onAdd(map: import('mapbox-gl').Map): HTMLElement;
    map: mapboxgl.Map | undefined;
    onRemove(): void;
}
export type Units = import('@turf/helpers').Units;
export type RulerControlOptions = {
    units?: import("@turf/helpers").Units | undefined;
    labelFormat?: ((n: number) => string) | undefined;
    symbolLayout?: mapboxgl.SymbolLayout | undefined;
    symbolPaint?: mapboxgl.SymbolPaint | undefined;
    lineLayout?: mapboxgl.LineLayout | undefined;
    linePaint?: mapboxgl.LinePaint | undefined;
    markerCSS?: Partial<CSSStyleDeclaration> | undefined;
    invisible?: boolean | undefined;
};
import mapboxgl from 'mapbox-gl';
import { labelFormat } from './label-format.js';
