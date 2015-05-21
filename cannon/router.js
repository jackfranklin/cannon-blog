import React from 'react';
import { Route } from 'react-router';

export default {
  buildFromPages(pages) {
    return pages.map(function(page) {
      if (page.path === 'index.js') {
        page.path = '/';
      }
      return (
        <Route key={page.path}
          name={page.path}
          path={page.path.replace('.js', '')}
          handler={page.Component}>
        </Route>
      );
    });
  }
};
