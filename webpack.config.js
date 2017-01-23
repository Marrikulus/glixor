var path = require('path')
var webpack = require('webpack');

module.exports = {
  entry:  './client/index.jsx',
  output: {
    filename: 'public/bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: path.resolve(__dirname, 'node_modules'),
    }]
  },
  resolve: {
   modulesDirectories: [
     "node_modules",
     __dirname + "/client",
   ],
   extensions: ['', '.js', '.jsx']
  }
}
