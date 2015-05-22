#!/usr/bin/env node
require('babel/register');

var writeToSite = require('./lib/write-to-site');
var getRoutes = require('./lib/get-routes');

getRoutes(function(err, routes) {
  console.log('Found Routes', routes);
  writeToSite('routes.json', JSON.stringify(routes, null, 2));
});
