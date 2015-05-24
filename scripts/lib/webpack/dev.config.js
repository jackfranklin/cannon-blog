var path = require('path');

module.exports = {
  entry: path.join(__dirname, '..', '..', '..', './client/bootstrap.compiled.js'),
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
}
