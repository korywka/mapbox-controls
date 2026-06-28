export default ZoomControl;
declare class ZoomControl implements IControl {
    container: HTMLDivElement;
    buttonIn: HTMLButtonElement;
    buttonOut: HTMLButtonElement;
    onAdd(map: import("mapbox-gl").Map): HTMLElement;
    map: import("mapbox-gl").Map | undefined;
    onRemove(): void;
}
import type { IControl } from './types';
