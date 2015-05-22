module.exports = {
  entry: './bootstrap.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  loaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }
  ]
}
