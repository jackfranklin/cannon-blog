import React from 'react';
import { Link } from 'react-router';

export default class CannonLayout extends React.Component {
  static childContextTypes = {
    router: React.PropTypes.func
  }

  getChildContext() {
    return { router: this.props.router };
  }

  makeLink(props, child) {
    return (<Link {...props}>{child}</Link>);
  }
}
