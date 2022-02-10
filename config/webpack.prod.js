const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');

const paths = require('./paths');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: paths.build,
    filename: 'js/[name].[contenthash].bundle.js',
    publicPath: '/'
  },
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    minimize: true,
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: { chunks: 'all' }
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
});
