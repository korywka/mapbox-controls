export default CompassControl;
declare class CompassControl implements IControl {
    constructor(options?: import("./types").ControlOptions);
    options: {
        instant?: boolean;
    };
    container: HTMLDivElement;
    icon: SVGElement;
    button: HTMLButtonElement;
    onControlButtonClick(): void;
    onRotate(): void;
    onAdd(map: import("mapbox-gl").Map): HTMLElement;
    map: import("mapbox-gl").Map | undefined;
    onRemove(): void;
}
import type { IControl } from './types';
