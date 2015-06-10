var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var ReactStylePlugin = require('react-style-webpack-plugin');

module.exports = {
  devtool: 'sourcemap',
  entry: './docs/DocumentationApplication.jsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/assets'),
    publicPath: 'assets/'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.jsx?$/,
        loaders: [
          'babel-loader'
          // ReactStylePlugin.loader()
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader')
      },
      {
        test: /\.(otf|eot|svg|ttf|woff)/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  plugins: [
    // new ReactStylePlugin('bundle.css')
    new ExtractTextPlugin('bundle.css')
  ]
};
