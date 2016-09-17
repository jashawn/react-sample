var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'app'),
  entry: { entry: './js/entry.jsx' , comment:'./js/CommentBox.jsx'},
  output: {
    path: path.join(__dirname, 'assets'),
    filename: '[name].js',
    publicPath: '/assets/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
  },
  module: {
    preLoaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'jsxhint' }],

    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['es2015','react'] } },
      { test: /\.less/, loader: 'style-loader!css-loader!less-loader' },
      { test: /\.(css)$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
    ],
  }
}
