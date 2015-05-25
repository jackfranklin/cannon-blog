import WebPackDevServer from 'webpack-dev-server';
import devConfig from './webpack.dev.config';
import webpack from 'webpack';
import touch from 'touch';

const WEBPACK_PORT = 8234;
const WEBPACK_HOST = 'localhost';

const serverOpts = {
  contentBase: 'http://localhost:8234',
  publicPath: 'http://localhost:8234/assets'
}

const compiler = webpack(devConfig);
const webpackServer = new WebPackDevServer(compiler, serverOpts);

webpackDevServer.listen(WEBPACK_PORT, WEBPACK_HOST, () => {
  const url = `http://${WEBPACK_HOST}:${WEBPACK_PORT}`;
  console.log('Webpack development server listening on %s', url);
});

compiler.plugin('compile', function() {
  console.log('compiling - writing update file');
  touch(path.join(__dirname, '..', '..', 'env', 'restart.txt'), { mtime: true }, function(err) {
    if (err) {
      console.error(err);
    }
  });
});
