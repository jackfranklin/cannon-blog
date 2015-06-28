import glob from 'glob';
import path from 'path';
import addFilesToRoute from '../add-files-to-route';

export default function(options = {}) {
  const directory = options.directory || 'posts';
  const postGlob = options.glob || '*.js';
  const url = options.url || '{{date}}-{{title}}';
  const dateFormat = options.dateFormat || 'YYYY-MM-DD';

  return function(req, res, next) {
    glob(postGlob, { cwd: directory }, function(err, posts) {
      if(err) return next(err);

      addFilesToRoute(posts.map((post) => path.join(directory, post)), {
        url,
        dateFormat,
        type: 'posts'
      }, res, next);
    });
  };
};
