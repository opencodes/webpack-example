/**
 * Build the bootstrap module. We use the css from this build as an import within
 * the vendor module. This avoid the costly build of this module in the watchers
 *
 * To execute this build, use "npm run bootstrap".
 *
 */
var
  webpack = require("webpack"),
  path = require("path"),
  Clean = require('clean-webpack-plugin'),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  buildOutput = path.join(__dirname, 'src','main','js','bootstrap','build');

module.exports = {
  debug: true,
  devtool: "source-map",
  entry: {
    "bootstrap": ["bootstrap-loader"]
  },
  output: {
    path: buildOutput,
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      {test: /\.(css|scss)$/,loader: ExtractTextPlugin.extract("style", "css!sass")},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
      {test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?prefix=font/&limit=10000"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
      {test: /\.png$/, loader: "url-loader?mimetype=image/png" }
    ]
  },
  plugins: [
    new Clean([buildOutput]),
    new ExtractTextPlugin("[name].bundle.css")
  ]
};
