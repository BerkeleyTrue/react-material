'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ReactStylePlugin = require('react-style-webpack-plugin');


module.exports = {
	//devtool: 'sourcemap',
	entry: "./views/DocumentationApplication.js",
	output: {
		filename: "bundle.js",
		path: __dirname + "/assets",
		publicPath: "assets/"
	},
	module: {
		loaders: [
      {
        test:/\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.js$/,
        loaders: [
          'babel-loader', //jsx-loader?harmony',
          ReactStylePlugin.loader()
        ]
      },
      {
        test: /\.css$/,
	      loader: ExtractTextPlugin.extract('css-loader?sourceMap')
      },
      {
        test: /\.(otf|eot|svg|ttf|woff)/,
        loader: 'url-loader?limit=8192'
      }
		]
	},
	plugins: [
		new ReactStylePlugin('bundle.css', {allChunks: true})
	]
};