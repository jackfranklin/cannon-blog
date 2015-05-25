export default function(options) {
  return function(req, res, next) {
    res.locals.cannon = { routes: {} };
    next();
  };
};
