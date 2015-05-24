#!/usr/bin/env node

var path = require('path');
var nodemon = require('nodemon');
var fs = require('fs');
var _ = require('lodash');

var spawn = require('child_process').spawn;

// run a dev server on :8123
nodemon({
  script: path.join(__dirname, '..', 'index'),
  ext: 'js json'
});

nodemon.on('start', function () {
  console.log('Cannon has started');
}).on('quit', function () {
  console.log('Cannon has quit');
}).on('restart', function (files) {
  console.log('Cannon restarted due to: ', files);
});

// generate the routes file

var writeToSite = require('./lib/write-to-site');
var getRoutes = require('./lib/get-routes');

getRoutes(function(err, routes) {
  console.log('Found Routes', routes);
  console.log('Writing routes into bootstrap.js');
  fs.readFile(path.join(__dirname, '..', 'client', 'bootstrap.js'), {
    encoding: 'utf8'
  }, function(err, file) {
    var routeImports = _.map(routes, function(route) {
      var importStatement = 'import ' + route.name + 'Component from "' + route.path + '";';
      var componentAssign = 'components["' + route.name + '"] = ' + route.name + 'Component';
      var routeObj = {
        name: route.name,
        url: route.url,
        Component: route.name + 'Component'
      }
      return [importStatement, componentAssign, 'var ' + route.name + ' = ' + JSON.stringify(routeObj)].join('\n');
    });
    file = file.replace('//PLACEHOLDER:routeImports', routeImports.join('\n'));
    file = file.replace('//PLACEHOLDER:routeArray', 'var routes = [' + _.map(routes, function(route) {
      return route.name;
    }).join(', ') + '];');
    console.log(file);
    fs.writeFile(path.join(__dirname, '..', 'client', 'bootstrap.compiled.js'), file);
  });
});


// get webpack generating the client side app
var webpackPath = path.join(__dirname, '..', 'node_modules', '.bin', 'webpack');
var webpackProcess = spawn(webpackPath, [
  '--config', path.join(__dirname, 'lib', 'webpack', 'dev.config.js')
]);

webpackProcess.stderr.pipe(process.stdout);
webpackProcess.stdout.pipe(process.stdout);

