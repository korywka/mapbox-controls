export default CompassControl;
export type CompassControlOptions = {
    instant?: boolean;
};
declare class CompassControl {
    constructor(options?: CompassControlOptions);
    options: {
        instant?: boolean | undefined;
    };
    container: HTMLDivElement;
    icon: SVGElement;
    button: HTMLButtonElement;
    onControlButtonClick(): void;
    onRotate(): void;
    onAdd(map: import('mapbox-gl').Map): HTMLElement;
    map: import("mapbox-gl").Map | undefined;
    onRemove(): void;
}
