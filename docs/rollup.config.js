import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: 'docs/docs.js',
    output: {
      file: 'docs/docs.bundle.js',
      format: 'iife',
      sourcemap: true,
    },
    context: 'window',
    plugins: [
      resolve(),
      commonjs({ sourceMap: false }),
    ],
  },
];
