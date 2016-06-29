var webpack = require('webpack')

var brp = require("./babelRelayPlugin");
var path = require('path');
module.exports = {
  entry: './index.jsx',
  output: {
    path: 'client',
    filename: 'bundle.js',
    client: '/'
  },
  resolve: {
   extensions: ['', '.js', '.jsx']
 },

  module: {
    loaders: [

        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
    ]
  }
}
