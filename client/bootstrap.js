import _ from 'lodash';
import React from 'react';
import Router from 'react-router';

var components = {};
//PLACEHOLDER:routeImports
//PLACEHOLDER:routeArray

console.log('components', components);
console.log(_.map(routes, function(route) {
  route.Component = components[route.name];
  return route;
}, this));


