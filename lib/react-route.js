import React from 'react';
import { Route } from 'react-router';

export default function turnRouteIntoReactRoute(route) {
  var Component = route.Component || (function() {
    var component = require(route.componentPath);
    return component.default || component;
  })();

  if (route.path.slice(-1) !== '/' && route.path.length > 1) {
    route.path = route.path + '/';
  }

  console.log('Server route', route.path);

  return (
    <Route key={route.path}
      name={route.name}
      path={route.path}
      handler={Component}>
    </Route>
  );
};
