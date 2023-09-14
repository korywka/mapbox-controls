export default class LanguageControl {
    constructor(options?: LanguageControlOptions);
    container: HTMLDivElement;
    options: {
        supportedLanguages: string[];
        language?: string | undefined;
        getLanguageKey: (language: string) => string;
        excludedLayerIds: string[];
    };
    styleChangeListener(): void;
    setLanguage(lang?: string | undefined): void;
    browserLanguage(): string;
    localizeTextField(field: TextField, languageKey: string): TextField;
    onAdd(map: import('mapbox-gl').Map): HTMLElement;
    map: import("mapbox-gl").Map | undefined;
    onRemove(): void;
}
export type StyleFunction = import('mapbox-gl').StyleFunction;
export type Expression = import('mapbox-gl').Expression;
export type TextField = string | StyleFunction | [import("mapbox-gl").ExpressionName, ...any[]];
export type LanguageControlOptions = {
    supportedLanguages?: string[] | undefined;
    language?: string | undefined;
    getLanguageKey?: ((language: string) => string) | undefined;
    excludedLayerIds?: string[] | undefined;
};
