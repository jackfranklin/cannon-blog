import React from 'react';

export default class CannonHtmlDocument extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>Cannon Blog</title>
        </head>
        <body>
          <div id='root' dangerouslySetInnerHTML={{__html: this.props.markup}}>
          </div>
        </body>
      </html>
    )
  }
}
