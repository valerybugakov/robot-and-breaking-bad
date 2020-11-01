/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  env: {
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: ['import', '@typescript-eslint', 'jest', 'prettier'],
  parserOptions: {
    createDefaultProgram: true,
    project: path.resolve(__dirname, './tsconfig.json'),
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: false,
        ignoreRestSiblings: true,
        caughtErrorsIgnorePattern: '^ignore',
      },
    ],
  },
};
