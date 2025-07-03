import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';
import prettierPlugin from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default [
    js.configs.recommended,
    {
        files: ['**/*.ts', '**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tsParser,
                project: './tsconfig.json',
                sourceType: 'module',
                extraFileExtensions: ['.vue'],
                vueFeatures: {
                    scriptSetup: true
                }
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            vue,
            '@typescript-eslint': typescript,
            prettier: prettierPlugin,
            import: importPlugin,
        },
        rules: {
            ...vue.configs['vue3-essential'].rules,
            // TypeScript
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/no-unsafe-call': 'warn',
            '@typescript-eslint/no-unsafe-return': 'warn',

            // Prettier
            'prettier/prettier': 'warn',

            // Import order
            'import/order': [
                'warn',
                {
                    alphabetize: { order: 'asc' },
                },
            ],

            // General
            'no-unused-vars': 'off', // @typescript-eslint/no-unused-vars used
            'max-len': [
                'error',
                {
                    code: 130,
                    ignoreUrls: true,
                    ignoreStrings: true,
                    ignoreTemplateLiterals: true,
                },
            ],
        },
        settings: {
            'import/resolver': {
                // TODO: Try to solve this with eslint-import-resolver-vite after update to eslint 9
                alias: {
                    map: [
                        ['@starter-core/dash-ui', './starter-core/dash-ui'],
                        ['@starter-core/icons', './starter-core/icons'],
                        ['@/pages', './src/pages'],
                        ['@/services', './src/services'],
                        ['@/locales', './src/locales'],
                        ['@/components', './src/components'],
                        ['@/modules', './src/modules'],
                        ['@/helpers', './src/helpers'],
                        ['@/store', './src/store'],
                        ['@/plugins', './src/plugins'],
                        ['@/composables', './src/composables'],
                        ['@/types', './src/types'],
                        ['@/constants', './src/constants'],
                    ],
                    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
                },
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
                },
            },
        },
    },
    {
        // Keep this in different config https://github.com/eslint/eslint/discussions/18304
        ignores: [
            'starter-core/**',
            './vite.config.js',
            './vite.config.prod.js'
        ],
    }
];
