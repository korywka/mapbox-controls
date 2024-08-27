export default class LanguageControl {
    constructor(options?: import("./types").ControlOptions);
    options: {
        supportedLanguages: string[];
        language?: string;
        getLanguageKey: (language: string) => string;
        excludedLayerIds: string[];
    };
    container: HTMLDivElement;
    styleChangeListener: () => void;
    setLanguage(lang?: string | undefined): void;
    browserLanguage(): string;
    localizeTextField(field: import("./types").TextField, languageKey: string): import("./types").TextField;
    onAdd(map: import("mapbox-gl").Map): HTMLElement;
    map: import("mapbox-gl").Map | undefined;
    onRemove(): void;
}
