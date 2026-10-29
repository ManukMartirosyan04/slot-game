import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'coverage']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['src/engine/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react',
              message: 'engine must stay free of React.',
            },
            {
              name: 'react-dom',
              message: 'engine must stay free of React DOM.',
            },
            {
              name: 'pixi.js',
              message: 'engine must stay free of PixiJS.',
            },
            {
              name: '@pixi/react',
              message: 'engine must stay free of @pixi/react.',
            },
            {
              name: 'gsap',
              message: 'engine must stay free of GSAP.',
            },
          ],
          patterns: [
            {
              group: [
                'react/*',
                'react-dom/*',
                'pixi.js/*',
                '@pixi/*',
                'gsap/*',
              ],
              message: 'engine must stay free of UI and rendering libraries.',
            },
          ],
        },
      ],
      'no-restricted-globals': [
        'error',
        {
          name: 'window',
          message: 'engine must stay free of browser globals.',
        },
        {
          name: 'document',
          message: 'engine must stay free of browser globals.',
        },
        {
          name: 'navigator',
          message: 'engine must stay free of browser globals.',
        },
        {
          name: 'localStorage',
          message: 'engine must stay free of browser globals.',
        },
        {
          name: 'sessionStorage',
          message: 'engine must stay free of browser globals.',
        },
      ],
    },
  },
  eslintConfigPrettier,
]);
