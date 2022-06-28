import centroid from '@turf/centroid';

export default class Picture {
  /**
   * @param {import('../../types').RasterPictureOptions} options
   */
  constructor(options) {
    this.id = options.id;
    this.url = options.url;
    this.width = options.width;
    this.height = options.height;
    this.position = options.position;
    this.locked = false;
  }

  get coordinates() {
    return this.position.map((p) => [p.lng, p.lat]);
  }

  get centroid() {
    return centroid(this.asPolygonGeometry);
  }

  /**
   * @return {import('../../types').PolygonsGeometry}
   */
  get asPolygonGeometry() {
    return {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: { id: this.id },
        geometry: {
          type: 'Polygon',
          coordinates: [[...this.coordinates, this.coordinates[0]]],
        },
      }],
    };
  }

  /**
   * @return {import('../../types').PointsGeometry}
   */
  get asPointsGeometry() {
    return {
      type: 'FeatureCollection',
      features: this.coordinates.map((point, i) => ({
        type: 'Feature',
        properties: { index: i },
        geometry: { type: 'Point', coordinates: point },
      })),
    };
  }

  get imageSourceId() {
    return `${this.id}-image`;
  }

  /**
   * @return {import('mapbox-gl').ImageSourceRaw}
   */
  get imageSource() {
    return { type: 'image', url: this.url, coordinates: this.coordinates };
  }

  get polygonSourceId() {
    return `${this.id}-polygon`;
  }

  /**
   * @return {import('mapbox-gl').GeoJSONSourceRaw}
   */
  get polygonSource() {
    return { type: 'geojson', data: this.asPolygonGeometry };
  }

  /**
   * @return {import('mapbox-gl').RasterLayer}
   */
  get rasterLayer() {
    return {
      id: `${this.id}-raster`,
      type: 'raster',
      source: this.imageSourceId,
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
      source: this.polygonSourceId,
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
      source: this.polygonSourceId,
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
      source: this.polygonSourceId,
      paint: {
        'circle-radius': 5,
        'circle-color': 'rgb(61, 90, 254)',
        'circle-stroke-width': 3,
        'circle-stroke-color': '#fff',
      },
    });
  }

  /**
   * @param {number} index
   * @return {number}
   */
  oppositeKnobTo(index) {
    if (index === 0) return 2;
    if (index === 1) return 3;
    if (index === 2) return 0;
    if (index === 3) return 1;
    throw Error('invalid corner index');
  }

  /**
   * @param {import('mapbox-gl').Map} map
   * @param {number} width
   * @param {number} height
   * @return {import('../../types').RasterPicturePosition}
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
      map.unproject(position[0]),
      map.unproject(position[1]),
      map.unproject(position[2]),
      map.unproject(position[3]),
    ];
  }
}
