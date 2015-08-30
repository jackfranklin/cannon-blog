import React from 'react';
import CannonComponent from 'cannon-blog/lib/components/cannon-component';

export default class Index extends CannonComponent {
  render() {
    var latestPosts = this.posts().map(function(post) {
      return (
        <li key={post.path}>
          {this.makeLink({ to: post.path }, post.meta.title)}
        </li>
      );
    }.bind(this));

    return (
      <div>
        <p>Home Page</p>
        <h5>Blog Posts</h5>
        <ul>{ latestPosts }</ul>
      </div>
    );
  }
}
