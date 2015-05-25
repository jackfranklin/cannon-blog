import React from 'react';
import { Route } from 'react-router';

export default function turnRouteIntoReactRoute(route) {
  var Component = route.Component || require(route.componentPath);
  return (
    <Route key={route.path}
      name={route.name}
      path={route.path}
      handler={Component}>
    </Route>
  );
};
