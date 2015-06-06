export default function(options) {
  return function(req, res, next) {
    res.locals.cannon = {
      routes: {},
      layouts: {},
      data: {},
      config: options
    };
    if (req.url.length > 1 && req.url.slice(-1) !== '/') {
      res.redirect(req.url + '/');
    } else {
      next();
    }
  };
};
