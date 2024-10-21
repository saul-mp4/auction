import eslintPluginPrettier from 'eslint-plugin-prettier';
import globals from 'globals';
import js from '@eslint/js';

export default [
    js.configs.recommended,
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: globals.node,
        },
        plugins: {
            prettier: eslintPluginPrettier,
        },
        rules: {
            'prettier/prettier': 'error',
            'no-unused-vars': 'warn',
            'no-console': 'off',
            eqeqeq: ['error', 'always'],
            semi: ['error', 'always'],
            quotes: ['error', 'single'],
        },
    },
];
