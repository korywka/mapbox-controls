export default ImageControl;
export type ImageControlOptions = {
    removeButton?: boolean;
};
declare class ImageControl {
    constructor(options?: ImageControlOptions);
    container: HTMLDivElement;
    fileInput: HTMLInputElement;
    buttonAdd: HTMLButtonElement;
    buttonMove: HTMLButtonElement;
    buttonScale: HTMLButtonElement;
    buttonRotate: HTMLButtonElement;
    buttonRemove: HTMLButtonElement | undefined;
    rasters: Record<string, Raster>;
    currentRaster: Raster | null;
    currentMode: Move | Scale | Rotate | null;
    addFile(file: File, coordinates?: [number, number][] | undefined): Promise<string>;
    addUrl(url: string, coordinates?: [number, number][] | undefined): Promise<string>;
    addImage(image: HTMLImageElement, coordinates?: [number, number][] | undefined): Promise<string>;
    addRaster(raster: Raster): void;
    removeRaster(): void;
    selectRaster(id: string): void;
    deselectRaster(): void;
    setMode(mode: 'move' | 'scale' | 'rotate' | null): void;
    updateCoordinates(coordinates: [number, number][]): void;
    onMapClick: (event: import('mapbox-gl').MapMouseEvent) => void;
    setLock: (id: string, isLocked: boolean) => void;
    onAdd(map: import('mapbox-gl').Map): HTMLElement;
    map: import("mapbox-gl").Map | undefined;
    onRemove(): void;
}
import { Raster } from './raster.js';
import { Move } from './modes/move.js';
import { Scale } from './modes/scale.js';
import { Rotate } from './modes/rotate.js';
