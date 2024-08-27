export function toGeoJSONLine(coordinates: [number, number][]): import("geojson").Feature<import("geojson").LineString>;
export function toGeoJSONPoints(coordinates: [number, number][], options?: {
    units?: import("@turf/helpers").Units;
    labelFormat?: (v: number) => string;
}): import("geojson").FeatureCollection<import("geojson").Point>;
export namespace sources {
    let line: string;
    let points: string;
}
