const { resolve } = require('path');

const TARGET_DIR = resolve(__dirname, '..', 'dist', 'languages');
const SOURCE_DIR = resolve(__dirname, '..', 'source', 'languages');
const LANGUAGES_DIR = resolve(__dirname, '..', 'source', 'languages');

module.exports = {
  TARGET_DIR,
  SOURCE_DIR,
  LANGUAGES_DIR,
};
