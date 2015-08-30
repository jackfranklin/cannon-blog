import React from 'react';
import expect from 'expect.js';
import TestUtils from 'react/lib/ReactTestUtils';
import createDom from '../helpers/dom';
import CannonComponent from '../../src/components/cannon-component';

describe('Cannon HTML', () => {
  let MyPage;
  let rendered;
  let routes;

  beforeEach(() => {
    createDom('<html><body></body></html>');
    MyPage = class extends CannonComponent {
      render() {
        return (<p>{this.posts[0].path}</p>);
      }
    }

    routes = [{
      path: '/hello/',
      options: { type: 'posts' },
      meta: {}
    }, {
      path: '/about/',
      options: { type: 'pages' },
      meta: {}
    }];
  });

  //TODO: makes more sense to put posts onto this.props
  //then this test is much better and we stick to React conventions more
  it('sets the posts property', function() {
    let renderer = TestUtils.createRenderer();
    renderer.render(<MyPage routes={routes} />);
    let result = renderer.getRenderOutput();
    expect(result.props.children).to.eql('/hello/');
  });
});
