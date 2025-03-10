import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    ignores: ['node_modules', 'templates.js', 'public/templates.js'],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    rules: {
      'semi': ['error', 'always'], // Требует точку с запятой
      'quotes': ['error', 'single'], // Одинарные кавычки
      'no-unused-vars': 'warn', // Предупреждение о неиспользуемых переменных
    },
  },
  pluginJs.configs.recommended,
];

