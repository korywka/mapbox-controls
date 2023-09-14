import css from 'rollup-plugin-import-css';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
	input: 'preview.js',
	output: {
		file: 'preview.bundle.js',
		format: 'iife',
		sourcemap: false,
	},
	plugins: [
		commonjs(),
		resolve(),
		css({ output: 'preview.bundle.css' }),
	],
};
