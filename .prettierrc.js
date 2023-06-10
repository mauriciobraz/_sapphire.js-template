const SortImportPlugin = require('@ianvs/prettier-plugin-sort-imports');

/** @type {import('prettier').Options} */
module.exports = {
  semi: true,
  singleQuote: true,
  arrowParens: 'always',
  trailingComma: 'es5',
  plugins: [SortImportPlugin],

  /* SortImportPlugin */
  importOrder: [
    '<BUILTIN_MODULES>',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/(.*)$',
    '^[./]',
    '',
    '<TYPES>',
    '<TYPES>^[.]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderTypeScriptVersion: '5.1.3',
};
