import { FillLayer, GeoJSONSourceRaw, ImageSourceRaw, LngLat, Map, RasterLayer } from 'mapbox-gl';
import { FeatureCollection } from 'geojson';
import { ImagePosition } from './types';

class IImage {
  id: string
  file: File
  url: string
  width: number
  height: number
  position: ImagePosition /* LngLat: y, x */

  load(file: File) {
    return new Promise(((resolve, reject) => {
      this.file = file;

      const reader = new FileReader();
      const node = new Image();

      reader.addEventListener('load', () => {
        const imageUrl = reader.result as string;

        node.onload = () => {
          this.id = this.file.name;
          this.url = imageUrl;
          this.width = node.width;
          this.height = node.height;
          resolve(this);
        };

        node.onerror = reject;
        node.src = imageUrl;
      }, false);

      reader.readAsDataURL(this.file);
    }));
  }

  setInitialPosition(map: Map) {
    if (!this.width || !this.height) throw Error('image is not loaded');
    const padding = 20;
    const mapCanvas = map.getCanvas();
    const canvasWidth = mapCanvas.offsetWidth;
    const canvasHeight = mapCanvas.offsetHeight;
    const maxWidth = canvasWidth - padding * 2;
    const maxHeight = canvasHeight - padding * 2;
    const ratio = Math.min(maxWidth / this.width, maxHeight / this.height);
    const resizeWidth = this.width * ratio;
    const resizeHeight = this.height * ratio;
    const result: Array<[number, number]> = [
      [canvasWidth / 2 - resizeWidth / 2, canvasHeight / 2 - resizeHeight / 2], // left top
      [canvasWidth / 2 + resizeWidth / 2, canvasHeight / 2 - resizeHeight / 2], // right top
      [canvasWidth / 2 + resizeWidth / 2, canvasHeight / 2 + resizeHeight / 2], // right bottom
      [canvasWidth / 2 - resizeWidth / 2, canvasHeight / 2 + resizeHeight / 2], // left bottom
    ];
    map.setPitch(0); // reset pitch for correct projection
    this.position = result.map(point => map.unproject(point)) as ImagePosition;
  }

  get coordinates() {
    return this.position.map(p => [p.lng, p.lat]);
  }

  get asPolygon(): FeatureCollection {
    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: { id: this.id },
          geometry: { type: 'Polygon', coordinates: [[...this.coordinates, this.coordinates[0]]] },
        },
      ],
    };
  }

  get asPoints(): FeatureCollection {
    return {
      type: 'FeatureCollection',
      features: this.coordinates.map((point, i) => ({
        type: 'Feature',
        properties: { index: i },
        geometry: { type: 'Point', coordinates: point },
      })),
    };
  }

  get imageSource(): { id: string, source: ImageSourceRaw } {
    return {
      id: `${this.id}-raster`,
      source: { type: 'image', url: this.url, coordinates: this.coordinates },
    };
  }

  get polygonSource(): { id: string, source: GeoJSONSourceRaw } {
    return {
      id: `${this.id}-polygon`,
      source: { type: 'geojson', data: this.asPolygon },
    };
  }

  get pointsSource(): { id: string, source: GeoJSONSourceRaw } {
    return {
      id: `${this.id}-points`,
      source: { type: 'geojson', data: this.asPoints },
    };
  }

  get rasterLayer(): RasterLayer {
    return {
      id: `${this.id}-raster`,
      type: 'raster',
      source: this.imageSource.id,
      paint: { 'raster-fade-duration': 0, 'raster-opacity': 0.5 },
    };
  }

  get eventCaptureLayer(): FillLayer {
    return ({
      id: `${this.id}-event-capture`,
      type: 'fill',
      source: this.polygonSource.id,
      paint: { 'fill-opacity': 0 },
    });
  }

  get ratio() {
    return this.width / this.height;
  }

  getDiagonalCornerIndex(index: number): number {
    switch (index) {
    case 0:
      return 2;
    case 1:
      return 3;
    case 2:
      return 0;
    case 3:
      return 1;
    }

    throw Error('invalid corner index');
  }
}

export default IImage;
