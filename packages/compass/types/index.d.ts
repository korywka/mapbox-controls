export default CompassControl;
declare class CompassControl {
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
