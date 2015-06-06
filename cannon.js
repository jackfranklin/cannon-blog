require('babel/register');

module.exports = {
  pages: require('./lib/pages'),
  init: require('./lib/init'),
  render: require('./lib/render'),
  exposeRoutes: require('./lib/expose-routes'),
  posts: require('./lib/posts'),
  layouts: require('./lib/layouts'),
  htmlDocument: require('./lib/html-document'),
  data: require('./lib/data')
}
