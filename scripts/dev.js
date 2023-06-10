"use strict";

import { copy } from "fs-extra";
import { resolve } from "path";

import chokidar from "chokidar";
import crossSpawn from "cross-spawn";

import { LANGUAGES_DIR, SOURCE_DIR, TARGET_DIR } from "./_shared";
import runBuild from "./build";

/**
 * Runs the development script.
 * @fires {@link runBuild `runBuild`} to transpile TypeScript files to JavaScript.
 */
export default async function run() {
  await runBuild();

  // Watch for changes in the languages directory.
  chokidar.watch(LANGUAGES_DIR).on("all", async (event, path) => {
    if (event !== "change" || !path.endsWith(".json")) return;

    await copy(SOURCE_DIR, TARGET_DIR, {
      overwrite: true,
      preserveTimestamps: true,
    });
  });

  // Watch for changes in the target directory.
  let nodeProcess = startNodeProcess();

  chokidar.watch(resolve(TARGET_DIR, "index.js")).on("all", (event) => {
    if (event !== "change") return;

    nodeProcess.kill();
    nodeProcess = startNodeProcess();
  });

  process.on("SIGINT", () => {
    nodeProcess.kill();
  });
}

/**
 * Checks if a directory is empty.
 * @param {string} directory Directory to check if empty.
 * @returns {boolean} True if directory is empty, false otherwise.
 */
function isDirectoryEmpty(directory) {
  const files = readdirSync(directory);
  return files.length === 0;
}

/**
 * Starts a node process with the compiled code.
 * @returns {import("child_process").ChildProcess} Node process.
 */
function startNodeProcess() {
  return crossSpawn("node", ["dist/index.cjs"], {
    stdio: "inherit",
  });
}
