"use strict";

import { copy } from "fs-extra";
import { resolveTsPaths } from "resolve-tspaths";
import { build } from "tsup";

import { SOURCE_DIR, TARGET_DIR } from "./_shared";

/**
 * Transpile TypeScript files to JavaScript and copy static files.
 * @fires {@link build `tsup.build`} to transpile TypeScript files to JavaScript.
 */
export default async function run() {
  await build({
    config: true,
  });

  await copy(SOURCE_DIR, TARGET_DIR, {
    overwrite: true,
    preserveTimestamps: true,
  });

  await resolveTsPaths();
}

if (require.main === module) {
  void run();
}
