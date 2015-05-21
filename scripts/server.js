#!/usr/bin/env node

var path = require('path');
var nodemon = require('nodemon');

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
