import React from 'react';

class Page extends React.Component {
  linkTo(to, children) {
    return (
      <a href={this.props.router.makeHref(to)}>{children}</a>
    );
  }
}

export default {
  Page
}
