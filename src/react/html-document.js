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

  renderTitle() {
    if (this.props.title) {
      return <title>{this.props.title} Cannon Blog</title>;
    } else {
      return <title>Cannon Blog</title>;
    }
  }
  render() {
    return (
      <html>
        <head>
          { this.renderTitle() }
        </head>
        <body>
          <div id='root' dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
          { this.renderScript() }
        </body>
      </html>
    )
  }
}
