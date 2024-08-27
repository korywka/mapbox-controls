export default class StylesControl {
    constructor(options?: import("./types").ControlOptions);
    options: {
        styles: import("./types").Style[];
        onChange?: (style: import("./types").Style) => void;
        compact?: boolean;
    };
    container: HTMLDivElement;
    findStyle(name: string): import("./types").Style;
    getCurrentStyleName(): string;
    expanded(): void;
    compact(): void;
    onAdd(map: import("mapbox-gl").Map): HTMLElement;
    map: import("mapbox-gl").Map | undefined;
    onRemove(): void;
}
