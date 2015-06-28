var proxyquire = require('proxyquire').noCallThru();
import expect from 'expect.js';

import { Double } from 'doubler';

const pagesStub = [];

let {glob} = new Double({
  glob: (glob, opts, cb) => cb(null, pagesStub),
});

let {addFilesToRoute} = new Double({ addFilesToRoute: () => {} });

let pages = proxyquire('../../src/middlewares/pages', {
  'glob': glob,
  '../add-files-to-route': addFilesToRoute
});

describe('Cannon pages middleware', () => {
  beforeEach(() => {
    glob.reset();
    addFilesToRoute.reset();
  });
  const req = {};
  const res = {};
  const next = () => {};

  describe('options', () => {
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
});
