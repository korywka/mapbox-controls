export default ImageControl;
declare class ImageControl {
    container: HTMLDivElement;
    fileInput: HTMLInputElement;
    buttonAdd: HTMLButtonElement;
    buttonMove: HTMLButtonElement;
    buttonScale: HTMLButtonElement;
    buttonRotate: HTMLButtonElement;
    rasters: Record<string, Raster>;
    currentRaster: Raster | null;
    currentMode: Move | Scale | null;
    addFile(file: File): Promise<void>;
    addRaster(raster: Raster): void;
    selectRaster(id: string): void;
    deselectRaster(): void;
    setMode(mode: 'move' | 'scale' | 'rotate' | null): void;
    updateCoordinates(coordinates: [number, number][]): void;
    onMapClick: (event: import('mapbox-gl').MapMouseEvent) => void;
    onAdd(map: import('mapbox-gl').Map): HTMLElement;
    map: import("mapbox-gl").Map | undefined;
    onRemove(): void;
}
import { Raster } from './raster.js';
import { Move } from './modes/move.js';
import { Scale } from './modes/scale.js';
