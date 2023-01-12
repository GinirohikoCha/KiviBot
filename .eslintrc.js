const importOrder = [['builtin', 'external'], 'internal', ['sibling', 'parent', 'index'], 'type']

module.exports = {
  root: true,
  env: {
    browser: false
  },
  extends: ['viki-ts', 'plugin:prettier/recommended'],
  rules: {
    camelcase: 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'import/order': [1, { groups: importOrder }]
  }
}