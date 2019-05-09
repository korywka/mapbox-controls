import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

const plugins = [
  resolve(),
  babel({
    exclude: 'node_modules/**',
  }),
];

export default [
  {
    input: 'src/ruler/ruler.js',
    external: ['mapbox-gl', '@turf/distance'],
    output: {
      file: 'lib/ruler.js',
      format: 'esm',
    },
    plugins,
  },
  {
    input: 'src/compass/compass.js',
    output: {
      file: 'lib/compass.js',
      format: 'esm',
      indent: false,
    },
    plugins,
  },
  {
    input: 'src/styles/styles.js',
    output: {
      file: 'lib/styles.js',
      format: 'esm',
    },
    plugins,
  },
  {
    input: 'src/zoom/zoom.js',
    output: {
      file: 'lib/zoom.js',
      format: 'esm',
    },
    plugins,
  },
  {
    input: 'docs/docs.js',
    output: {
      file: 'docs/docs.bundle.js',
      format: 'iife',
    },
    plugins: [
      resolve(),
      commonjs({
        sourceMap: false,
      }),
    ],
  },
];
