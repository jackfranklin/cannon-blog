import CannonLayout from 'cannon-blog/lib/layout';
import React from 'react';

export default class Default extends CannonLayout {
  render() {
    return (
      <div>
        <div className='heading'>
          My Website
        </div>

        <div className='content'>
          { this.props.children }
        </div>
      </div>
    );
  }
}
