import React from 'react';
window.React = React;
import Router, { Route } from 'react-router';
import _ from 'lodash';

var components = {};
var layouts = {};

var routes = [
  {
    "name": "pages_index",
    "path": "/",
    "componentPath": "/Users/jackfranklin/git/jackfranklin.co.uk/pages/index.js",
    "meta": {},
    "options": {
      "type": "pages"
    }
  },
  {
    "name": "posts_hello_world",
    "path": "/2015-06-07-hello-world",
    "componentPath": "/Users/jackfranklin/git/jackfranklin.co.uk/posts/hello-world.js",
    "meta": {
      "date": "2015-06-07",
      "title": "Hello World",
      "path": "/2015-06-07-hello-world/"
    },
    "options": {
      "url": "{{date}}-{{title}}",
      "dateFormat": "YYYY-MM-DD",
      "type": "posts"
    }
  }
];
var rawLayouts = [
  {
    "path": "/Users/jackfranklin/git/jackfranklin.co.uk/layouts/default.js",
    "name": "default"
  }
];

var data = {};
var config = {
  "title": "Jack Franklin"
};

import pages_index from '/Users/jackfranklin/git/jackfranklin.co.uk/pages/index.js';
components['pages_index'] = pages_index;
import posts_hello_world from '/Users/jackfranklin/git/jackfranklin.co.uk/posts/hello-world.js';
components['posts_hello_world'] = posts_hello_world;

import layout_default from '/Users/jackfranklin/git/jackfranklin.co.uk/layouts/default.js';
layouts['default'] = layout_default;

var routesWithComponent = _.map(routes, function(route) {
  route.Component = components[route.name];
  return route;
});

console.log('Got routes', routesWithComponent);

var router = Router.create({
  location: Router.HistoryLocation,
  routes: _.map(routesWithComponent, function(route) {

    if (route.path.slice(-1) !== '/' && route.path.length > 1) {
      route.path = route.path + '/';
    }

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
  let matchedRoute = _.find(routes, (route) => route.path === state.path);
  let matchedLayout = matchedRoute.meta.layout || 'default';

  let layout = _.find(rawLayouts, (layout) => layout.name === matchedLayout);

  let LayoutComponent = layouts[layout.name];

  let title = matchedRoute.meta.title || '';

  //TODO: very messy below!
  React.render(
    <LayoutComponent route={matchedRoute} routes={routes} router={router}>
      <Handler route={matchedRoute} title={title} router={router} routes={routes} data={data} />
    </LayoutComponent>
    , document.getElementById('root'), () => {
      console.log('Route Change', state);
      const pageTitle = (function() {
        let routeTitle = matchedRoute.meta.title;
        if (routeTitle) {
          return `${routeTitle} : ${config.title}`;
        } else {
          return config.title;
        }
      })();

      if (pageTitle) document.title = pageTitle;
    }
  );
});

