import React from 'react';

class Page extends React.Component {
  componentWillMount() {
    console.log('props', this.props);
  }

  linkTo(to, children) {
    return (
      <a href={this.props.router.makeHref(to)}>{children}</a>
    );
  }
}

export default {
  Page
}
