module.exports = {
  pages: require('./middlewares/pages'),
  init: require('./middlewares/init'),
  render: require('./middlewares/render'),
  expose: require('./middlewares/expose'),
  posts: require('./middlewares/posts'),
  layouts: require('./middlewares/layouts'),
  htmlDocument: require('./middlewares/html-document'),
  data: require('./middlewares/data')
}
