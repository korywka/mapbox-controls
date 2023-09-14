export default class StylesControl {
    constructor(options?: StylesControlOptions);
    container: HTMLDivElement;
    options: {
        styles: Style[];
        onChange?: ((style: Style) => void) | undefined;
        compact?: boolean | undefined;
    };
    findStyleByName(name: string): Style;
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
    styles?: Style[] | undefined;
    onChange?: ((style: Style) => void) | undefined;
    compact?: boolean | undefined;
};
