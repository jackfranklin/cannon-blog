import React from 'react';
import { Link } from 'react-router';

export default class CannonComponent extends React.Component {
  makeLink(props, child) {
    return (<Link {...props}>{child}</Link>);
  }
}
