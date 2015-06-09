import React from 'react';

export default class CannonHtmlDocument extends React.Component {

  static childContextTypes = {
    router: React.PropTypes.func
  }

  getChildContext() {
    return { router: this.props.router };
  }

  renderScript() {
    return (
      <script src={this.props.script}></script>
    );
  }
  render() {
    return (
      <html>
        <head>
          <title>{this.props.title} Cannon Blog</title>
        </head>
        <body>
          <div id='root' dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
          { this.renderScript() }
        </body>
      </html>
    )
  }
}
