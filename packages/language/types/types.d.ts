export type ControlOptions = {
    supportedLanguages?: string[];
    language?: string;
    getLanguageKey?: (language: string) => string;
    excludedLayerIds?: string[];
};
export type FunctionField = import("mapbox-gl").DataDrivenPropertyValueSpecification<string>;
export type ExpressionFiled = import("mapbox-gl").ExpressionSpecification;
export type TextField = string | FunctionField | ExpressionFiled;
