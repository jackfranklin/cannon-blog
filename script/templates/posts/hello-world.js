import React from 'react';
import CannonComponent from 'cannon-blog/lib/components/cannon-component';

export const meta = {
  date: '2015-05-31',
  title: 'Hello World'
};

export default class HelloWorldPost extends CannonComponent {
  render() {
    return (
      <div>
        { this.makeLink({ to: "/" }, "Home") }
        <h1>My First Blog Post</h1>
        <p>Hello World</p>
      </div>
    );
  }
}
