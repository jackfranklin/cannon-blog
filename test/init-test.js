import expect from 'expect.js';
import { Double } from 'doubler';

import init from '../src/init';

describe('Cannon init', () => {
  const next = () => {};

  let res;
  beforeEach(() => res = { locals: {} });

  it('sets up the cannon object', () => {
    init({})({ url: '/' }, res, next);

    expect(res.locals.cannon).to.eql({
      routes: {},
      layouts: {},
      data: {},
      config: {}
    });
  });

  it('sets the initial object given as the config for cannon', () => {
    const config = {};
    init(config)({ url: '/' }, res, next);
    expect(res.locals.cannon.config).to.eql(config);
  });

  it('redirects if the url lacks a trailing slash', function() {
    let { redirect } = new Double({ redirect: () => {} });

    res.redirect = redirect;

    init({})({ url: '/foo' }, res, next);

    expect(redirect.called).to.eql(true);
    expect(redirect.args[0]).to.eql(['/foo/']);
  });
});
