import React from 'react';
import CannonComponent from 'cannon-blog/component';

export const meta = {
  date: '2015-05-31',
  title: 'Hello World'
};

export default class HelloWorldPost extends CannonComponent {
  render() {
    return (
      <div>
        <h1>My First Blog Post</h1>
        <p>Hello World</p>
      </div>
    );
  }
}
