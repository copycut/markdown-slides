/* eslint-disable */
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const path = require('path')
const pkg = require('./package.json')
const env = process.env.NODE_ENV === 'production' ? 'production' : 'development'

const plugins = [
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    favicon: 'src/favicon.ico',
  }),
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify(env),
    VERSION: JSON.stringify(pkg.version),
  }),
]

if (env === 'production') {
  plugins.push(
    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/'],
    }),
  )
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  mode: env,
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins,
}
