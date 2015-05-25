var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, 'out', 'client.js'),
  output: {
    path: './public/js',
    filename: 'bundle.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    // set process.env to reflect the browser or server values
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    })
  ],
}
