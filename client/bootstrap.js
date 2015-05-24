import _ from 'lodash';
import React from 'react';
import Router from 'react-router';
import cannonRouter from '../cannon/router';

var components = {};
//PLACEHOLDER:routeImports
//PLACEHOLDER:routeArray

var routes =  _.map(routes, function(route) {
  route.Component = components[route.name];
  route.path = route.name + '.js';
  return route;
});

console.log('routes', routes);

var router = Router.create({
  routes: cannonRouter.buildFromPages(routes),
});

router.run(function(Handler, state) {
  var mountNode = document.getElementById('root');

  React.render(<Handler router={router} />, mountNode, function() {
  });
});



