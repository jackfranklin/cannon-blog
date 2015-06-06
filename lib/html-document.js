import path from 'path';

export default function(filename) {
  return function(req, res, next) {
    res.locals.cannon.htmlDocument = path.join(process.cwd(), filename);
    next();
  };
}
