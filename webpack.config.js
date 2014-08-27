var ExtractTextPlugin = require("extract-text-webpack-plugin");
var jsxloader = require.resolve('jsx-loader');

module.exports = {
	entry: "./views/DocumentationApplication.js",
	output: {
		filename: "bundle.js",
		path: __dirname + "/assets",
		publicPath: "assets/"
	},
	module: {
		loaders: [
      { test: /\.js$/, loaders: ["react-style/lib/webpack?{autoprefixer:true, compress:false}", jsxloader] },
			{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
			{ test: /\.png$/, loader: "file-loader" },
      { test: /\.html$/, loader: "html-loader" }
		]
	},
	plugins: [
		new ExtractTextPlugin("styles.css")
	]
};
