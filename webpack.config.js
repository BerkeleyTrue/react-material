var ExtractTextPlugin = require("extract-text-webpack-plugin");
var istyle = require.resolve('react-style/lib/webpack');
var jsxloader = require.resolve('jsx-loader');

module.exports = {
	entry: "./views/TestView.js",
	output: {
		filename: "bundle.js",
		path: __dirname + "/assets",
		publicPath: "assets/"
	},
	module: {
		loaders: [
      { test: /\.js$/, loaders: ["react-style/lib/webpack?{autoprefixer:{browsers: '> 1%'}, compress:true}", jsxloader] },
			{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
			{ test: /\.png$/, loader: "file-loader" }
		]
	},
	plugins: [
		new ExtractTextPlugin("styles.css")
	]
};
