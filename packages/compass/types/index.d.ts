export default CompassControl;
export type CompassControlOptions = {
    instant?: boolean;
};
declare class CompassControl {
    constructor(options?: CompassControlOptions);
    options: CompassControlOptions;
    container: HTMLDivElement;
    icon: SVGElement;
    button: HTMLButtonElement;
    rotate(): void;
    onAdd(map: import('mapbox-gl').Map): HTMLElement;
    map: import("mapbox-gl").Map | undefined;
    onRemove(): void;
}
