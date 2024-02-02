module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: [
        'plugin:react/recommended'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.eslint.json',
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'react-hooks'
    ],
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        '@typescript-eslint/indent': ['error', 4],
        'no-multiple-empty-lines': 'warn',
        'comma-dangle': 'off',
        'no-console': 'off'
    }
};
