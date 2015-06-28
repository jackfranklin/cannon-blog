import React from 'react';
import expect from 'expect.js';
import TestUtils from 'react/lib/ReactTestUtils';
import createDom from '../helpers/dom';
import CannonHtml from '../../src/components/cannon-html';

describe('Cannon HTML', () => {
  let HtmlComponent;
  let rendered;

  beforeEach(() => {
    createDom('<html><body></body></html>');
    HtmlComponent = class extends CannonHtml {
      render() {
        return (
          <html>
            <head>{this.renderScript()}</head>
            <body>{this.renderApp()}</body>
          </html>
        );
      }
    }
    rendered = TestUtils.renderIntoDocument(
      <HtmlComponent
        markup='<p class="test">Hello World</p>'
        script='foo.js'
      />
    );
  });

  it('sets the internal markup', function() {
    const markup = TestUtils.findRenderedDOMComponentWithTag(rendered, 'div');
    expect(markup.getDOMNode().innerHTML).to.eql('<p class="test">Hello World</p>');
  });

  it.only('renders the script', function() {
    const markup = TestUtils.findRenderedDOMComponentWithTag(rendered, 'script');
    expect(markup.getDOMNode().src).to.eql('foo.js');
  });
});
