import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const plugins = [
  resolve(),
  babel({
    exclude: 'node_modules/**',
  }),
];

export default [
  {
    input: 'src/ruler.js',
    external: ['mapbox-gl', '@turf/distance'],
    output: {
      name: 'MapRuler',
      file: 'lib/ruler.js',
      format: 'umd',
      globals: {
        '@turf/distance': 'turf.distance',
        'mapbox-gl': 'mapboxgl',
      },
    },
    plugins,
  },
  {
    input: 'src/compass.js',
    output: {
      name: 'MapCompass',
      file: 'lib/compass.js',
      format: 'umd',
    },
    plugins,
  },
  {
    input: 'src/styles.js',
    output: {
      name: 'MapStyles',
      file: 'lib/styles.js',
      format: 'umd',
    },
    plugins,
  },
  {
    input: 'src/zoom.js',
    output: {
      name: 'MapZoom',
      file: 'lib/zoom.js',
      format: 'umd',
    },
    plugins,
  },
];
