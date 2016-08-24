/**
 * frontend webpack build for commerce platform wds-web module.
 */
var
  webpack = require("webpack"),
  Clean = require('clean-webpack-plugin'),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  AssetsPlugin = require('assets-webpack-plugin'),
  buildOutput = __dirname + '/src/main/webapp/assets',
  assetsOutput = __dirname + '/src/main/resources/',
  assetsOutputTarget = __dirname + '/target/classes/',
  CompressionPlugin = require('compression-webpack-plugin'),
  PROD = process.env.NODE_ENV === 'prod',
  HASH = PROD ? '.[hash]' : '';

module.exports = {

  debug: true,
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" }
  },
  entry: {
    "vendor": ['jquery', './src/main/js/bootstrap'],
    "main": "./src/main/js/main",
    "auth": "./src/main/js/auth"
  },
  output: {
    path: buildOutput,
    filename: "[name].bundle"+HASH+".js",
    chunkFilename: "[id].chunk.bundle"+HASH+".js"
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ],
    loaders: [
      {test: /\.json$/, loaders: ["json-loader"]},
      {test: /\.(css|scss)$/,loader: ExtractTextPlugin.extract("style", "css!sass")},
      /*
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
      {test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?prefix=font/&limit=10000"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
      */{
        test: /\.(eot|svg|ttf|woff2?)(\?\w+)?$/i,
        loaders: [
          'file?name=[name]-[sha1:hash:hex:10].[ext]'
        ]
      },
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
      {test: /\.png$/, loader: "url-loader?mimetype=image/png" }
    ]
  },
  resolve: {
    alias: {
      "codemirror":"summernote"
      //"CodeMirror": "codemirror"
    }
  },
  plugins: [
    new Clean([buildOutput]),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.bundle"+HASH+".js",
      minChunks: 5
    }),
    new ExtractTextPlugin("[name].bundle"+HASH+".css"),
    //new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new AssetsPlugin({
      path: assetsOutput,
      filename: 'assets.json',
      prettyPrint: true
    }),
    new AssetsPlugin({
      path: assetsOutputTarget,
      filename: 'assets.json',
      prettyPrint: true
    }),
    // summernote: require
    new webpack.DefinePlugin({
      'require.specified': 'require.resolve'
    }),

    new CompressionPlugin()
  ],
  eslint: {
    configFile: '.eslintrc'
  }

};
