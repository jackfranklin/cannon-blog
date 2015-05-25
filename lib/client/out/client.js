import React from 'react';
window.React = React;
import Router, { Route } from 'react-router';
import _ from 'lodash';

var components = {};

var routes = [
  {
    "name": "pages_about",
    "path": "/about",
    "componentPath": "/Users/jackfranklin/git/cannon-blog/pages/about.js"
  },
  {
    "name": "pages_index",
    "path": "/",
    "componentPath": "/Users/jackfranklin/git/cannon-blog/pages/index.js"
  }
];

import pages_about from '/Users/jackfranklin/git/cannon-blog/pages/about.js';
components['pages_about'] = pages_about;
import pages_index from '/Users/jackfranklin/git/cannon-blog/pages/index.js';
components['pages_index'] = pages_index;

var routesWithComponent = _.map(routes, function(route) {
  route.Component = components[route.name];
  return route;
});

var router = Router.create({
  location: Router.HistoryLocation,
  routes: _.map(routesWithComponent, function(route) {
    console.log('Defining route with path ' + route.path);
    return (
      <Route key={route.path}
        name={route.name}
        path={route.path}
        handler={route.Component}>
      </Route>
    );
  })
});

router.run(function(Handler, state) {
  React.render(<Handler router={router} />, document.getElementById('root'), () => {
    console.log('Route Change', state);
  });
});

