import React from 'react';

export default class CannonHtmlDocument extends React.Component {

  static childContextTypes = {
    router: React.PropTypes.func
  }

  getChildContext() {
    return { router: this.props.router };
  }

  renderScript() {
    if (!this.props.renderForClient) return null;

    return (
      <script src="/js/bundle.js"></script>
    );
  }
  render() {
    return (
      <html>
        <head>
          <title>Cannon Blog</title>
        </head>
        <body>
          <div id='root' dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
          { this.renderScript() }
        </body>
      </html>
    )
  }
}
