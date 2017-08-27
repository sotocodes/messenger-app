const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    filename: 'lib/bundle.js',
    path: __dirname + '/public/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.svg$/,
        loader: 'url-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html',
      inject: 'body',
    }),
    new CopyWebpackPlugin([
      { from: './src/css', to: 'css/' },
      { from: './src/messenger', to: 'messenger/' },
      { from: './src/sidebar', to: 'sidebar' },
      { from: './src/users', to: 'users' },
    ]),
  ],
};
