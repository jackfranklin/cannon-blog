var proxyquire = require('proxyquire').noCallThru();
import path from 'path';
import expect from 'expect.js';
import { Double } from 'doubler';

let proxyConfig = {
  [path.join(process.cwd(), 'pages/foo.js')]: {},
  [path.join(process.cwd(), 'pages/index.js')]: {},
  [path.join(process.cwd(), 'pages/meta.js')]: { meta: { a: 1 } },
  [path.join(process.cwd(), 'posts/one.js')]: {
    meta: {
      date: '2015-05-18',
      title: 'Hello World'
    }
  }
}

var addFilesToRoute = proxyquire('../src/add-files-to-route', proxyConfig);

describe('addFilesToRoute', () => {
  describe('when there are no cannon routes configured', () => {
    it('errors to the next middleware', () => {
      const { next } = new Double({ next: () => {} });
      addFilesToRoute([], {}, { locals: {} }, next);
      expect(next.callCount).to.eql(1);
      expect(next.args[0][0].status).to.eql(500);
    });
  });

  describe('adding pages', () => {
    const next = () => {};
    const options = { type: 'pages' };
    const res = { locals: { cannon: { routes: {} } } };

    it('sets up the route', () => {
      const files = ['pages/foo.js'];
      addFilesToRoute(files, options, res, next);
      expect(res.locals.cannon.routes).to.eql({
        'pages/foo': {
          componentPath: path.join(process.cwd(), files[0]),
          meta: {},
          name: 'pages/foo',
          options: { type: 'pages' },
          path: '/foo'
        }
      });
    });

    it('special cases the path of index.js', function() {
      const files = ['pages/index.js'];
      addFilesToRoute(files, options, res, next);
      expect(res.locals.cannon.routes['pages/index']).to.eql({
        componentPath: path.join(process.cwd(), files[0]),
        meta: {},
        name: 'pages/index',
        options: { type: 'pages' },
        path: '/'
      });
    });

    it('stores on the route any meta that\'s exported', function() {
      const files = ['pages/meta.js'];
      addFilesToRoute(files, options, res, next);
      expect(res.locals.cannon.routes['pages/meta']).to.eql({
        componentPath: path.join(process.cwd(), files[0]),
        meta: { a: 1 },
        name: 'pages/meta',
        options: { type: 'pages' },
        path: '/meta'
      });
    });
  });

  describe('adding posts', () => {
    const next = () => {};
    const options = {
      type: 'posts',
      url: '{{date}}-{{title}}',
      dateFormat: 'YYYY-MM-DD'
    };
    const res = { locals: { cannon: { routes: {} } } };

    it('adds them as expected', () => {
      const files = ['posts/one.js'];
      addFilesToRoute(files, options, res, next);
      expect(res.locals.cannon.routes).to.eql({
        'posts/one': {
          name: 'posts/one',
          path: '/2015-05-18-hello-world',
          componentPath: path.join(process.cwd(), 'posts/one.js'),
          meta: { date: '2015-05-18', title: 'Hello World' },
          options
        }
      });
    });
  });
});
