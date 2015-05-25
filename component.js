import React from 'react';

export default class CannonComponent extends React.Component {
  linkTo(to, children) {
    return (
      <a href={this.props.router.makeHref(to)}>{children}</a>
    );
  }
}
