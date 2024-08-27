export default ZoomControl;
declare class ZoomControl {
    container: HTMLDivElement;
    buttonIn: HTMLButtonElement;
    buttonOut: HTMLButtonElement;
    onAdd(map: import("mapbox-gl").Map): HTMLElement;
    map: import("mapbox-gl").Map | undefined;
    onRemove(): void;
}
