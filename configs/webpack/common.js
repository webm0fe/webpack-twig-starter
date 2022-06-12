const paths = require('../paths');
const fs = require('fs');

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BeautifyHtmlWebpackPlugin = require('beautify-html-webpack-plugin');

const { js, build, scss, assets, fonts, twigPages } = paths;

const imagesLoadersOptions = [
  {
    loader: 'url-loader',
    options: {
      limit: 1000, // in bytes,
      name(url) {
        const newName = url.replace(`${assets}\\`, '');
        const regex = new RegExp(/\\/g);

        return newName.replace(regex, '/');
      },
      publicPath: assets,
      outputPath: 'assets',
    },
  },
  {
    loader: 'webpack-image-resize-loader',
    options: {
      width: 1920,
    },
  },
];

const pagesOfTwig = fs.readdirSync(twigPages);
const templates = [];
pagesOfTwig.forEach(page => {
  const isTwigFile = page.indexOf('.twig') !== -1
  const baseName = page.replace('.twig', '');

  templates.push(
    new HtmlWebpackPlugin({
      template: !isTwigFile ? `${twigPages}/${page}/${fs.readdirSync(`${twigPages}/${page}`)}` : `${twigPages}/${page}`,
      filename: page.indexOf('.twig') !== -1 && !!baseName ? `${baseName}.html` : `${page}/${baseName}.html`,
      chunk: [baseName],
    }),
    new BeautifyHtmlWebpackPlugin(),
  );
});

const conf = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  /* Чанки назвать так же как и входной файл .twig,
   * в противном случае css и js не подтянутся автоматом */
  entry: {
    index: [
      `${js}/pages/index.js`,
      `${scss}/pages/index.scss`,
    ],
  },
  output: {
    path: build,
    filename: 'js/[name].js',
    publicPath: '/',
    clean: true,
    crossOriginLoading: 'anonymous',
  },
  resolve: {
    alias: {
      '@assets': assets,
      '@components': path.resolve(__dirname, '../../src/js/components/'),
      '@utils': path.resolve(__dirname, '../../src/js/utils/'),
    },
    extensions: ['.js', '.json'],
  },

  module: {
    rules: [
      /* Twig */
      {
        test: /\.twig$/,
        use: [
          "twig-loader",
          {
            loader: "twig-html-loader",
            options: {
              pretty: true,
              namespaces: {
                layouts: "./src/twig/include/layout",
                assets: "./src/assets",
                components: "./src/twig/include/components",
                blocks: "./src/twig/include/blocks",
              },
            },
          },
        ],
      },
      /* images */
      {
        test: /\.(png|jpe?g|webp|gif?)$/i,
        use: imagesLoadersOptions,
      },
      /* fonts */
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // меняет слешы на линуксовские
              name(url) {
                const newName = url.replace(`${fonts}\\`, '');
                const regex = new RegExp(/\\/g);

                return newName.replace(regex, '/');
              },
              publicPath: fonts,
              outputPath: 'fonts',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    ...templates,
    new CopyWebpackPlugin({
      patterns: [
        {
          from: assets,
          to: 'assets',
        },
        {
          from: fonts,
          to: 'fonts',
        },
      ],
    }),
  ],
};

module.exports = conf;
