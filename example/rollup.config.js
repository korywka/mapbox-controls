import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: 'example/example.js',
    output: {
      file: 'example/example.min.js',
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
