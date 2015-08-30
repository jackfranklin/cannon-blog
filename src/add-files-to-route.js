var _ = require('lodash');
var path = require('path');
var moment = require('moment');
var slug = require('slug');
var Handlebars = require('handlebars');

export default function(files, options, res, next) {
  //options.type: 'page' or 'post'

  if (!(res.locals.cannon && res.locals.cannon.routes)) {
    var err = new Error("No cannon locals set up. Did you call cannon.init?");
    err.status = 500;
    return next(err);
  }

  var routes = _.map(files, function(file) {
    var componentPath = path.join(process.cwd(), file);
    var name = file.replace('.js', '');

    var meta = require(componentPath).meta || {};
    var routePath = (function() {
      if (options.type === 'posts') {
        var datePart = moment(meta.date).format(options.dateFormat);
        var titlePart = meta.slug || meta.title;
        return '/' + Handlebars.compile(options.url)({
          date: datePart,
          title: slug(titlePart, { lower: true })
        });
      } else if (options.type === 'pages') {
        //TODO: what if the directory pages are in isn't called "pages" ?
        // this needs to replace based on what the dir is called
        return name.replace('pages', '');
      }
    })();

    // special case the home page
    if (routePath === '/index') {
      routePath = '/';
    }

    return {
      name: name,
      path: routePath,
      componentPath: componentPath,
      meta,
      options
    };
  });

  _.forEach(routes, function(route) {
    res.locals.cannon.routes[route.name] = route;
  });

  next();
}
