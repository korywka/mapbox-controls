import type { DataDrivenPropertyValueSpecification, ExpressionSpecification } from "mapbox-gl";

export type { IControl } from "mapbox-gl";

export interface ControlOptions {
	supportedLanguages?: string[];
	language?: string;
	getLanguageKey?: (language: string) => string;
	excludedLayerIds?: string[];
}

export type FunctionField = DataDrivenPropertyValueSpecification<string>;
export type ExpressionField = ExpressionSpecification;
export type TextField = string | FunctionField | ExpressionField;
