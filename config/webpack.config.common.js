const { resolve, join } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const IS_DEV = process.env.NODE_ENV !== 'production';

module.exports = {
  target: 'web',
  entry: ['./src/client/index.js'],
  output: {
    publicPath: '/',
    path: resolve(__dirname, '..', 'build', 'client'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'img/[name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: IS_DEV
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ],
  resolve: {
    modules: ['node_modules', join('src', 'client')],
    extensions: ['.js', '.jsx']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  stats: {
    assetsSort: '!size',
    children: false,
    chunks: false,
    colors: true,
    entrypoints: false,
    modules: false
  }
};
