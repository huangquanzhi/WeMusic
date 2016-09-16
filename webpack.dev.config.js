const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
var ENV = process.env.ENV = process.env.NODE_ENV = 'development';

module.exports = {
  entry: [
    'whatwg-fetch',
    'webpack-dev-server/client?https://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './app/index.js'
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
        loader: 'react-hot',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          'env': {
            'development': {
              'presets': ['react-hmre'],
            },
          },
        },
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
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      ie: 'component-ie',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './app/index.html' }),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV)
      }
    })
  ]
};