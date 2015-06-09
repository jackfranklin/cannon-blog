#!/usr/bin/env node

var webpack = require('webpack');
var config = require('../lib/client/webpack.prod.config');
var dumpHtml = require('../lib/static/build-site');
var rmdir = require('rmdir');
var fs = require('fs-extra');
var path = require('path');

rmdir('__out', function() {
  console.log('Cannon generating production');
  webpack(config, function(err, stats) {
    console.log('Prod bundle generated');

    var oldPath = path.join(process.cwd(), 'public', 'prod');
    var newPath = path.join(process.cwd(), '__out', 'js');

    dumpHtml().then(function() {
      console.log('Static files generated into __out');

      fs.copy(oldPath, newPath, function() {
        console.log('Bundled JS moved into __out');
      });
    }).catch(function() {
      console.log('ERROR', arguments);
    });
  });
});
