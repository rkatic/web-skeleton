'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[chunkhash].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.tpl.html'),
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __APP_URL__: JSON.stringify('http://192.168.50.4:7000'),
      __API_URL__: JSON.stringify('http://192.168.50.4:3000'),
    }),
    new webpack.optimize.CommonsChunkPlugin('common-[chunkhash].js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
  module: {
    loader: {
      test: /\.js$/,
      loader: 'babel-loader',
      include: path.join(__dirname, 'src'),
      exclude: /node_modules/,
    },
  },
};