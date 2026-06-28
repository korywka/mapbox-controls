import type { Units } from "@turf/helpers";
import type { LineLayerSpecification, CircleLayerSpecification, SymbolLayerSpecification } from "mapbox-gl";

export type { IControl } from "mapbox-gl";

export interface ControlOptions {
	units?: Units;
	labelFormat?: (n: number) => string;
	lineLayout?: LineLayerSpecification["layout"];
	linePaint?: LineLayerSpecification["paint"];
	markerLayout?: CircleLayerSpecification["layout"];
	markerPaint?: CircleLayerSpecification["paint"];
	labelLayout?: SymbolLayerSpecification["layout"];
	labelPaint?: SymbolLayerSpecification["paint"];
	invisible?: boolean;
}
