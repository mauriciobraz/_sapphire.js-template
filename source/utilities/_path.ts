import { readdirSync, statSync } from 'fs';
import { join } from 'path';

/**
 * Reads all subfolders recursively from the given directory.
 * @param dirname Directory to read all subfolders recursively.
 * @param protectedDirs Protected directories to ignore.
 * @returns All subfolders from the given directory.
 *
 * @example
 * ```typescript
 * readFoldersRecursively(join(__dirname, 'modules'));
 * // => ['admin', 'misc', 'mod', ...]
 * ```
 */
export function readdirRecursiveSync(
  dirname: string,
  protectedDirs: string[] = []
): string[] {
  const filesAndDirs = readdirSync(dirname);

  const dirs = filesAndDirs.filter((fileOrDir) => {
    return statSync(join(dirname, fileOrDir)).isDirectory();
  });

  const validDirs = dirs.filter((dirName) => {
    return !protectedDirs.includes(dirName);
  });

  const result: string[] = [];

  for (let i = 0; i < validDirs.length; i++) {
    const subDir = join(dirname, validDirs[i]);
    result.push(subDir, ...readdirRecursiveSync(subDir, protectedDirs));
  }

  return result;
}
