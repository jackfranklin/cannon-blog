import _ from 'lodash';
import path from 'path';

export default function(layouts) {
  return function(req, res, next) {
    let processedLayouts = _.map(layouts, function(layout, key) {
      return _.extend({}, {
        path: path.join(process.cwd(), layout),
        name: key
      });
    });

    res.locals.cannon.layouts = processedLayouts;

    next();
  }
}
