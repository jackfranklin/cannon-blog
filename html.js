import React from 'react';

export default class CannonHtml extends React.Component {
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

  renderApp() {
    return <div id='root' dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
  }
}
