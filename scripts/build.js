'use strict';

const { build } = require('tsup');
const { copy } = require('fs-extra');
const { resolveTsPaths } = require('resolve-tspaths');

const { SOURCE_DIR, TARGET_DIR } = require('./_shared');

/**
 * Transpile TypeScript files to JavaScript and copy static files.
 * @fires {@link build `tsup.build`} to transpile TypeScript files to JavaScript.
 */
async function run() {
  await build({
    config: true,
  });

  await copy(SOURCE_DIR, TARGET_DIR, {
    overwrite: true,
    preserveTimestamps: true,
  }).catch(() => undefined);

  await resolveTsPaths();
}

module.exports = run;

if (require.main === module) {
  void run();
}
