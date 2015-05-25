module.exports = function cannonPages(options) {

  return function(req, res, next) {
    res.send('hello world');
  };
}
