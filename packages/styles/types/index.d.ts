export default class StylesControl implements IControl {
    constructor(options?: import("./types").ControlOptions);
    options: {
        styles: {
            label: string;
            styleName: string;
            styleUrl: string;
        }[];
        onChange?: (style: import("./types").Style) => void;
        compact?: boolean;
    };
    container: HTMLDivElement;
    findStyle(name: string): {
        label: string;
        styleName: string;
        styleUrl: string;
    };
    getCurrentStyleName(): string;
    expanded(): void;
    compact(): void;
    onAdd(map: import("mapbox-gl").Map): HTMLElement;
    map: import("mapbox-gl").Map | undefined;
    onRemove(): void;
}
import type { IControl } from './types';
