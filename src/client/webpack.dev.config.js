var path = require('path');

module.exports = {
  entry: path.join(process.cwd(), 'cannon-out', 'client.js'),
  output: {
    path: './public/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      }
    ]
  }
}
