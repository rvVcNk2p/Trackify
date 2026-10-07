require('@rushstack/eslint-patch/modern-module-resolution')

// The core indent rule misreads decorated class properties (@Prop, @Watch) parsed by
// @typescript-eslint v5+, so those nodes are skipped on top of the standard ignores.
const [indentLevel, indentSize, indentOptions] = require('eslint-config-standard').rules.indent

module.exports = {
  root: true,
  env: {
    node: true
  },
  ignorePatterns: [
    '**/dist/**/*.js'
  ],
  plugins: [
    'simple-import-sort'
  ],
  extends: [
    'plugin:vue/recommended',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-var-requires': 0,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    indent: [indentLevel, indentSize, {
      ...indentOptions,
      ignoredNodes: [...indentOptions.ignoredNodes, 'PropertyDefinition[decorators.length>0]']
    }]
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
