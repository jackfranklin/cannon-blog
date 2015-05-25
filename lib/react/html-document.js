import React from 'react';

export default class CannonHtmlDocument extends React.Component {

  renderScript() {
    if (!this.props.renderForClient) return null;

    return (
      <script src="/js/bundle.js"></script>
    );
          // <div id='root' dangerouslySetInnerHTML={{__html: this.props.markup}}>
          // </div>
  }
  render() {
    return (
      <html>
        <head>
          <title>Cannon Blog</title>
        </head>
        <body>
          <div id='root'></div>
          { this.renderScript() }
        </body>
      </html>
    )
  }
}
