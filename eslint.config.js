import js from '@eslint/js';
import globals from 'globals';

export default [
	js.configs.recommended,
	{
		ignores: [
			'**/lib/**',
			'**/*.bundle.js',
			'**/*.d.ts',
		],
	},
	{
		languageOptions: {
			globals: globals.browser,
		},
		rules: {
			quotes: ['error', 'single'],
			indent: ['error', 'tab'],
		},
	},
];
