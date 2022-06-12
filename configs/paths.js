const path = require('path');

const paths = {
  src: path.resolve(__dirname, '../src'),
  fonts: path.resolve(__dirname, '../src/fonts'),
  assets: path.resolve(__dirname, '../src/assets'),
  scss: path.resolve(__dirname, '../src/styles'),
  js: path.resolve(__dirname, '../src/js'),
  public: path.resolve(__dirname, '../public'),
  build: path.resolve(__dirname, '../dist'),
  twigPages: path.resolve(__dirname, '../src/twig/pages'),
};

module.exports = paths;