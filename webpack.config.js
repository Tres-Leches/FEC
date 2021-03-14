const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = {
  entry: `${SRC_DIR}/App.jsx`,
  output: {
  //   filename: 'bundle.js',
    path: DIST_DIR,
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      React: require('path').resolve('./node_modules/react'),
      reactDOM: require('path').resolve('./node_modules/react-dom'),
    },
  },
  plugins: [
    // new CompressionPlugin({
    // filename: '[path].gz[query]',
    // algorithm: 'gzip',
    // test: /\.(js|css|html|svg)$/,
    // threshold: 8192,
    // minRatio: 0.8
    // }),
    new BrotliPlugin({ //brotli plugin
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    }),

    // new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
};
