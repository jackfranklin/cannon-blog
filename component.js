import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';

export default class CannonComponent extends React.Component {
  constructor(props) {
    super(props);
    this.posts = _.map(_.filter(props.routes, function(route) {
      return route.options && route.options.type === 'posts';
    }), function(post) {
      return _.extend(post.meta, {
        path: post.path
      });
    });
  }

  makeLink(props, child) {
    return (<Link {...props}>{child}</Link>);
  }

}
