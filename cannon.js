require('babel/register');

module.exports = {
  pages: require('./lib/pages'),
  init: require('./lib/init'),
  render: require('./lib/render'),
  exposeRoutes: require('./lib/expose-routes')
}
