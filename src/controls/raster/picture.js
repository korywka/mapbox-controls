import centroid from '@turf/centroid';

export default class Picture {
  /**
   * @param {import('../../types').Raster.PictureOptions} options
   */
  constructor(options) {
    this.id = options.id;
    this.url = options.url;
    this.width = options.width;
    this.height = options.height;
    this.position = options.position;
    this.locked = false;
  }

  get centroid() {
    return centroid(this.asJSONPolygon);
  }

  /**
   * @return {import('../../types').Raster.Polygon}
   */
  get asJSONPolygon() {
    return {
      type: 'Feature',
      properties: { id: this.id },
      geometry: {
        type: 'Polygon',
        coordinates: [[...this.position, this.position[0]]],
      },
    };
  }

  /**
   * @return {import('../../types').Raster.Points}
   */
  get asJSONPoints() {
    return {
      type: 'FeatureCollection',
      features: this.position.map((coordinates, index) => ({
        type: 'Feature',
        properties: { index },
        geometry: {
          type: 'Point',
          coordinates,
        },
      })),
    };
  }

  /**
   * @return {{ id: string, data: import('mapbox-gl').ImageSourceRaw }}
   */
  get imageSource() {
    return {
      id: `${this.id}-image`,
      data: { type: 'image', url: this.url, coordinates: this.position },
    };
  }

  /**
   * @return {{ id: string, data: import('mapbox-gl').GeoJSONSourceRaw }}
   */
  get polygonSource() {
    return {
      id: `${this.id}-polygon`,
      data: { type: 'geojson', data: this.asJSONPolygon },
    };
  }

  /**
   * @return {{ id: string, data: import('mapbox-gl').GeoJSONSourceRaw }}
   */
  get pointsSource() {
    return {
      id: `${this.id}-points`,
      data: { type: 'geojson', data: this.asJSONPoints },
    };
  }

  /**
   * @return {import('mapbox-gl').RasterLayer}
   */
  get rasterLayer() {
    return {
      id: `${this.id}-raster`,
      type: 'raster',
      source: this.imageSource.id,
      paint: { 'raster-fade-duration': 0, 'raster-opacity': 0.5 },
    };
  }

  /**
   * @return {import('mapbox-gl').FillLayer}
   */
  get fillLayer() {
    return ({
      id: `${this.id}-fill`,
      type: 'fill',
      source: this.polygonSource.id,
      paint: { 'fill-opacity': 0 },
    });
  }

  /**
   * @return {import('mapbox-gl').LineLayer}
   */
  get contourLayer() {
    return ({
      id: `${this.id}-contour`,
      type: 'line',
      source: this.polygonSource.id,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-dasharray': [0.2, 2],
        'line-color': 'rgb(61, 90, 254)',
        'line-width': 2,
      },
    });
  }

  /**
   * @return {import('mapbox-gl').CircleLayer}
   */
  get knobsLayer() {
    return ({
      id: `${this.id}-knobs`,
      type: 'circle',
      source: this.pointsSource.id,
      paint: {
        'circle-radius': 5,
        'circle-color': 'rgb(61, 90, 254)',
        'circle-stroke-width': 3,
        'circle-stroke-color': '#fff',
      },
    });
  }

  /**
   * @param {import('mapbox-gl').Map} map
   * @param {number} width
   * @param {number} height
   * @return {import('../../types').Raster.Position}
   */
  static centerMapPosition(map, width, height) {
    if (!width || !height) throw Error('image is not loaded');
    const padding = 20;
    const mapCanvas = map.getCanvas();
    const canvasWidth = mapCanvas.offsetWidth;
    const canvasHeight = mapCanvas.offsetHeight;
    const maxWidth = canvasWidth - padding * 2;
    const maxHeight = canvasHeight - padding * 2;
    const ratio = Math.min(maxWidth / width, maxHeight / height);
    const resizeWidth = width * ratio;
    const resizeHeight = height * ratio;
    /** @type Array<[number, number]> */
    const position = [
      [canvasWidth / 2 - resizeWidth / 2, canvasHeight / 2 - resizeHeight / 2], // left top
      [canvasWidth / 2 + resizeWidth / 2, canvasHeight / 2 - resizeHeight / 2], // right top
      [canvasWidth / 2 + resizeWidth / 2, canvasHeight / 2 + resizeHeight / 2], // right bottom
      [canvasWidth / 2 - resizeWidth / 2, canvasHeight / 2 + resizeHeight / 2], // left bottom
    ];

    map.setPitch(0); // reset pitch for correct projection

    return [
      /** @type [number, number] */ (map.unproject(position[0]).toArray()),
      /** @type [number, number] */ (map.unproject(position[1]).toArray()),
      /** @type [number, number] */ (map.unproject(position[2]).toArray()),
      /** @type [number, number] */ (map.unproject(position[3]).toArray()),
    ];
  }
}
