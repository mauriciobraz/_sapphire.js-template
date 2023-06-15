'use strict';

const { resolve } = require('path');

const chokidar = require('chokidar');
const crossSpawn = require('cross-spawn');
const { copy } = require('fs-extra');

const { LANGUAGES_DIR, SOURCE_DIR, TARGET_DIR } = require('./_shared');
const runBuild = require('./build');

/**
 * Runs the development script.
 * @fires {@link runBuild `runBuild`} to transpile TypeScript files to JavaScript.
 */
async function run() {
  await runBuild();

  // Watch for changes in the languages directory.
  chokidar.watch(LANGUAGES_DIR).on('all', async (event, path) => {
    if (event !== 'change' || !path.endsWith('.json')) return;

    await copy(SOURCE_DIR, TARGET_DIR, {
      overwrite: true,
      preserveTimestamps: true,
    });
  });

  // Watch for changes in the target directory.
  let nodeProcess = startNodeProcess();

  chokidar.watch(resolve(TARGET_DIR, 'index.js')).on('all', (event) => {
    if (event !== 'change') return;

    nodeProcess.kill();
    nodeProcess = startNodeProcess();
  });

  process.on('SIGINT', () => {
    nodeProcess.kill();
  });
}

module.exports = run;

/**
 * Starts a node process with the compiled code.
 * @returns {import("child_process").ChildProcess} Node process.
 */
function startNodeProcess() {
  return crossSpawn('node', ['--enable-source-maps', 'dist/index.js'], {
    stdio: 'inherit',
  });
}

if (require.main === module) {
  void run();
}
