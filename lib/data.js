export default function(data) {
  return function(req, res, next) {
    Object.keys(data).forEach((key) => {
      res.locals.cannon.data[key] = data[key];
    });
    next();
  }
}
