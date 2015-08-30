var proxyquire = require('proxyquire').noCallThru();
import expect from 'expect.js';

import { Double } from 'doubler';

describe('Cannon pages middleware', () => {
  let glob;
  let addFilesToRoute;
  let pages;
  let pagesStub;

  beforeEach(() => {
    glob = new Double({
      glob: (glob, opts, cb) => cb(null, pagesStub),
    }).glob;

    addFilesToRoute = new Double({ addFilesToRoute: () => {} }).addFilesToRoute;

    pages = proxyquire('../../src/middlewares/pages', {
      'glob': glob,
      '../add-files-to-route': addFilesToRoute
    });
  });

  const req = {};
  const res = {};
  const next = () => {};

  describe('options', () => {
    beforeEach(() => pagesStub = []);

    it('sets the default directory and glob if they are not defined', () => {
      let middleware = pages();
      middleware(req, res, next);

      expect(glob.called).to.eql(true);
      let [searchGlob, opts, fn] = glob.args[0];
      expect(searchGlob).to.eql('*.js');
      expect(opts).to.eql({ cwd: 'pages' });
      expect(fn).to.be.a(Function);
    });

    it('lets the directory and glob be set', () => {
      let middleware = pages({
        directory: 'foo',
        glob: '**/*.js'
      });

      middleware(req, res, next);

      expect(glob.called).to.eql(true);
      let [searchGlob, opts, fn] = glob.args[0];
      expect(searchGlob).to.eql('**/*.js');
      expect(opts).to.eql({ cwd: 'foo' });
      expect(fn).to.be.a(Function);
    });
  });

  describe('adding the pages to route', () => {
    beforeEach(() => pagesStub = ['index.js', 'about.js']);

    it('finds the matching files and calls addFilesToRoute', () => {
      let middleware = pages();

      middleware(req, res, next);

      expect(glob.called).to.eql(true);
      expect(addFilesToRoute.called).to.eql(true);

      let [foundPages, opts,] = addFilesToRoute.args[0];
      expect(foundPages).to.eql(['pages/index.js', 'pages/about.js']);
      expect(opts).to.eql({ type: 'pages' });
    });
  });
});
