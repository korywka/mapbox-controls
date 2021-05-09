import {
  FillLayer,
  GeoJSONSource,
  GeoJSONSourceRaw,
  ImageSource,
  ImageSourceRaw,
  LineLayer,
  Map,
  RasterLayer
} from 'mapbox-gl';
import { Feature, FeatureCollection, Position } from 'geojson';

class IImage {
  id: string
  file: File
  url: string
  width: number
  height: number
  position: Position[]

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
    this.position = result.map(point => map.unproject(point).toArray());
  }

  get asPolygon(): FeatureCollection {
    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: { id: this.id },
          geometry: { type: 'Polygon', coordinates: [[...this.position, this.position[0]]] },
        },
      ],
    };
  }

  get imageSource(): { id: string, source: ImageSourceRaw } {
    return {
      id: `${this.id}-raster`,
      source: { type: 'image', url: this.url, coordinates: this.position },
    };
  }

  get vectorSource(): { id: string, source: GeoJSONSourceRaw } {
    return {
      id: `${this.id}-polygon`,
      source: { type: 'geojson', data: this.asPolygon },
    };
  }

  get rasterLayer(): RasterLayer {
    return {
      id: this.id,
      type: 'raster',
      source: this.imageSource.id,
      paint: { 'raster-fade-duration': 0, 'raster-opacity': 0.5 },
    };
  }

  get contourLayer(): LineLayer {
    return ({
      id: `${this.id}-contour`,
      type: 'line',
      source: this.vectorSource.id,
      paint: { 'line-color': '#4264fb', 'line-width': 3, 'line-opacity': 0 },
    });
  }

  get fillLayer(): FillLayer {
    return ({
      id: `${this.id}-fill`,
      type: 'fill',
      source: this.vectorSource.id,
      paint: { 'fill-opacity': 0 },
    });
  }
}

export default IImage;
