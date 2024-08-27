/**
 * @typedef {{
 * 	supportedLanguages?: string[]
 * 	language?: string
 * 	getLanguageKey?: (language: string) => string
 * 	excludedLayerIds?: string[]
 * }} ControlOptions
 */

/** @typedef {import('mapbox-gl').DataDrivenPropertyValueSpecification<string>} FunctionField */
/** @typedef {import('mapbox-gl').ExpressionSpecification} ExpressionFiled */

/** @typedef {string | FunctionField | ExpressionFiled} TextField */

export {};
