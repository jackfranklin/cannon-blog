var proxyquire = require('proxyquire').noCallThru();
import expect from 'expect.js';
import { Double } from 'doubler';

describe('Cannon rendering', () => {
  let render;
  beforeEach(() => {
    render = proxyquire('../../src/middlewares/render', {
    });
  });

  describe('when the request isn\'t for HTML', () => {
    it('just calls next', () => {
      let middleware = render();
      const req = {
        headers: { accept: 'text/html' },
        accepts: () => false
      };

      const { next } = new Double({ next: () => {} });

      middleware(req, {}, next);
      expect(next.called).to.eql(true);
    });
  });
});
