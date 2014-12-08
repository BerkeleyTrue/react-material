'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ReactStylePlugin = require('react-style-webpack-plugin');

var path = require('path');

var port = JSON.parse(process.env.npm_package_config_port || 6000),
  subdomain =   "",//JSON.parse(/*process.env.npm_package_config_subdomain*/ ""),
  url = subdomain ?
  'https://' + subdomain + '.localtunnel.me' :
  'http://localhost:' + port;


module.exports = {
	devtool: 'sourcemap',
	entry: [
      'webpack-dev-server/client?' + url,
      "./views/DocumentationApplication.js"
    ],
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
          "autocat-loader",
          ReactStylePlugin.loader(),
          'jsx-loader?harmony&sourceMap'
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