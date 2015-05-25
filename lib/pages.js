import _ from 'lodash';
import addFilesToRoute from './add-files-to-route';
import path from 'path';
import glob from 'glob';

const cwd = process.cwd();

export default function(options) {
  const directory = options.directory || 'pages';
  const pageGlob = options.glob || '*.js';

  return function(req, res, next) {
    glob(pageGlob, { cwd: directory }, function(err, pages) {
      if (err) return next(err);

      addFilesToRoute(_.map(pages, (page) => path.join(directory, page)), {
        type: 'pages'
      }, res, next);
    });
  };
}
