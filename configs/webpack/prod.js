const common = require('./common');

const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const conf = {
  mode: 'production',
  target: 'browserslist',
  devtool: false,
  output: {
    filename: 'js/[name].js',
    publicPath: './',
  },
  module: {
    rules: [
      /* css */
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      /* JavaScript */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].min.css',
    }),
  ],
};

module.exports = merge(common, conf);