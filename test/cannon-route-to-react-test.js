import expect from 'expect.js';
import React from 'react';
var proxyquire = require('proxyquire').noCallThru();

import turnRouteIntoReactRoute from '../src/cannon-route-to-react';

describe('Cannon route to react', () => {
  let Component;

  beforeEach(() => {
    Component = class extends React.Component {
      render() { return <p>Hello World</p> }
    }
  });

  describe('when the route only has a componentPath', () => {
    let proxyTurnRoute;
    beforeEach(() => {
      proxyTurnRoute = proxyquire('../src/cannon-route-to-react', {
        'foo': Component
      });
    });

    it('requires the component', () => {
      let result = proxyTurnRoute({
        componentPath: 'foo',
        path: '/',
        name: 'index'
      });

      expect(result._store.props.handler).to.be.a(Function);
    });
  });

  describe('When the route has a Component property', () => {
    it('returns a Route component', () => {
      let result = turnRouteIntoReactRoute({
        Component,
        path: '/',
        name: 'index'
      });

      expect(result._store.props.handler).to.be.a(Function);
      expect(result._store.props.name).to.eql('index');
      expect(result._store.props.path).to.eql('/');
    });
  });
});
