export function toGeoJSONLine(coordinates: [number, number][]): import("geojson").Feature<import("geojson").LineString>;
export function toGeoJSONPoints(coordinates: [number, number][], options?: {
    units?: import("@turf/helpers").Units;
    areaUnits?: import("@turf/helpers").AreaUnits;
    labelFormat?: (v: number, units?: import("@turf/helpers").Units) => string;
    labelAreaFormat?: (v: number, units?: import("@turf/helpers").AreaUnits) => string;
    showArea?: boolean;
}): import("geojson").FeatureCollection<import("geojson").Point>;
export namespace sources {
    let line: string;
    let points: string;
}
