#!/usr/bin/env node

var path = require('path');
var nodemon = require('nodemon');

var spawn = require('child_process').spawn;



var webpackPath = path.join(__dirname, '..', 'node_modules', '.bin', 'webpack');

var webpackProcess = spawn(webpackPath, ['--help']);

webpackProcess.stderr.pipe(process.stdout);

webpackProcess.stdout.pipe(process.stdout);

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
