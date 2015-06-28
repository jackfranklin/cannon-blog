var proxyquire = require('proxyquire').noCallThru();
import expect from 'expect.js';

import { Double } from 'doubler';

describe('Cannon posts middleware', () => {
  let glob;
  let addFilesToRoute;
  let posts;
  let postsStub;

  beforeEach(() => {
    glob = new Double({
      glob: (glob, opts, cb) => cb(null, postsStub),
    }).glob;

    addFilesToRoute = new Double({ addFilesToRoute: () => {} }).addFilesToRoute;

    posts = proxyquire('../../src/middlewares/posts', {
      'glob': glob,
      '../add-files-to-route': addFilesToRoute
    });
  });

  const req = {};
  const res = {};
  const next = () => {};

  describe('options', () => {
    beforeEach(() => postsStub = ['hello-world.js']);

    it('sets correct glob defaults', () => {
      let middleware = posts();
      middleware(req, res, next);

      expect(glob.called).to.eql(true);
      let [searchGlob, opts, fn] = glob.args[0];
      expect(searchGlob).to.eql('*.js');
      expect(opts).to.eql({ cwd: 'posts' });
      expect(fn).to.be.a(Function);
    });

    it('sets correct defaults for the blog posts', () => {
      let middleware = posts();
      middleware(req, res, next);

      let [foundPosts, options,] = addFilesToRoute.args[0];
      expect(foundPosts).to.eql(['posts/hello-world.js'])
      expect(options).to.eql({
        url: '{{date}}-{{title}}',
        dateFormat: 'YYYY-MM-DD',
        type: 'posts'
      })
    });
  });
});
