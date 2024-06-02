export default class StylesControl {
    constructor(options?: StylesControlOptions);
    options: {
        styles: Style[];
        onChange?: ((style: Style) => void) | undefined;
        compact?: boolean | undefined;
    };
    container: HTMLDivElement;
    findStyle(name: string): Style;
    getCurrentStyleName(): string;
    expanded(): void;
    compact(): void;
    onAdd(map: import('mapbox-gl').Map): HTMLElement;
    map: import("mapbox-gl").Map | undefined;
    onRemove(): void;
}
export type Style = {
    label: string;
    styleName: string;
    styleUrl: string;
};
export type StylesControlOptions = {
    styles?: Style[];
    onChange?: (style: Style) => void;
    compact?: boolean;
};
