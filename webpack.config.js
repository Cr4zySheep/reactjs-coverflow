var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry:  path.join(__dirname, '/src/reactjs-coverflow.js'),
  output: {
    filename: path.join(__dirname,'/lib/reactjs-coverflow.js')
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  },
};
