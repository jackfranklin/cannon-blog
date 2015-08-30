module.exports = function(options) {
  return function(req, res, next) {
    if (req.path === '/__cannon/') {
      res.json(res.locals.cannon);
    } else {
      next();
    }
  }
};
