var proxyquire = require('proxyquire').noCallThru();
import React from 'react';
import expect from 'expect.js';
import { Double } from 'doubler';

class TestLayout extends React.Component {
  render() {
    return <p>Hello World</p>;
  }
}
describe('Cannon rendering', () => {
  let render;
  let generateClientBootstrap;

  beforeEach(() => {
    generateClientBootstrap = new Double({
      generateClientBootstrap: () => {}
    }).generateClientBootstrap;

    render = proxyquire('../../src/middlewares/render', {
      '../client/generate-bootstrap': generateClientBootstrap,
      'default-layout.js': TestLayout
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

  describe('when the request is for HTML', () => {
    const next = () => {};
    let req;
    let res;

    beforeEach(() => {
      req = {
        headers: { accept: 'text/html' },
        accepts: () => true,
        url: '/'
      }
      res = {
        send: new Double().functions('send').send,
        locals: {
          cannon: {
            routes: [ { path: '/', Component: () => {}, meta: {} } ],
            layouts: [{
              name: 'default',
              path: 'default-layout.js'
            }],
            config: {}
          }
        }
      }
    });

    it('calls generateClientBootstrap and renders HTML', () => {
      const middleware = render();
      middleware(req, res, next);
      expect(generateClientBootstrap.called).to.eql(true);
      let htmlResponse = res.send.args[0][0];
      expect(htmlResponse).to.contain('<!DOCTYPE html>');
      expect(htmlResponse).to.contain('<title>Cannon Blog</title>');
    });
  });
});
