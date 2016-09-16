const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
var ENV = process.env.ENV = process.env.NODE_ENV = 'production';

module.exports = {
  context: path.join(__dirname, 'app'),
  entry: [
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        }
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    alias: {
      ie: 'component-ie',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html' }),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV)
      }
    })
  ]
};