const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "index_bundle.js"
	},
	mode: "development",
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: "vue-loader"
			},
			{
				test: /\.s?css$/,
				use: ["vue-style-loader", "css-loader", "postcss-loader"]
			}
		]
	},
	plugins: [
		new Dotenv(),
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: "index.html"
		})
	]
};
