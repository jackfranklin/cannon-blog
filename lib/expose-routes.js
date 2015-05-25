module.exports = function(options) {
  return function(req, res, next) {
    // TODO: shouldn't expose this usually?
    // need some header for it?
    if (req.path === '/__cannon/routes/') {
      res.json({
        routes: res.locals.cannon.routes
      });
    } else {
      next();
    }
  }
};
