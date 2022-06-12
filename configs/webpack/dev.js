const paths = require('../paths');

const webpack = require('webpack');
const {merge} = require('webpack-merge');
const portFinderSync = require("portfinder-sync");

const common = require('./common');

const {build} = paths;

const port = portFinderSync.getPort(3000);

const localIp = require('os').networkInterfaces().en1[1].address

console.log(`>>> : Your local ip: %c${localIp}:${port}`, "color: blue; font-size:15px;")

const conf = {
  mode: 'development',
  target: 'web',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    compress: true,
    contentBase: build,
    historyApiFallback: true,
    host: "0.0.0.0",
    port: port,
    public: `localhost:${port}`,
    open: false,
    clientLogLevel: 'silent',
  },
  module: {
    rules: [
      /* css */
      {
        test: /\.(sc|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {importLoaders: 1, url: false},
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = merge(common, conf);
