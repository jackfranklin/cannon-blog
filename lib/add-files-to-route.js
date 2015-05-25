var _ = require('lodash');
var path = require('path');

module.exports = function(files, options, res, next) {
  //options.type: 'page' or 'post'

  if (!(res.locals.cannon && res.locals.cannon.routes)) {
    var err = new Error("No cannon locals set up. Did you call cannon.init?");
    err.status = 500;
    return next(err);
  }

  // { name: '', component: 'path/to/file', path: 'url' }
  var routes = _.map(files, function(file) {
    var componentPath = path.join(process.cwd(), file);
    var name = file.replace('.js', '');

    var routePath = (function() {
      if (options.type === 'post') {
      } else if (options.type === 'pages') {
        return name.replace('pages', '');
      }
    })();

    // special case the home page
    if (routePath === '/index') {
      routePath = '/';
    }

    if (!routePath.endsWith('/')) {
      routePath = `${routePath}/`;
    }

    console.log('Got route', routePath);
    return {
      name: name,
      path: routePath,
      componentPath: componentPath,
      transform: options.transform
    };
  });

  _.forEach(routes, function(route) {
    res.locals.cannon.routes[route.name] = route;
  });

  next();
}
