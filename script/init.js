#!/usr/bin/env node
var exec = require('child_process').exec;
var async = require('async');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

function install(name, done) {
  var child = exec('npm install --save ' + name);
  console.log('Installing ' + name);
  child.stdout.on('data', console.log.bind(console));
  child.on('close', function(code) {
    if (code === 0) return done();
    return done(new Error("install failed"));
  });
}

function createDirectory(dir) {
  console.log('Creating directory', dir);
  return mkdirp.sync(dir);
}
function writeTemplate(template) {
  var contents = fs.readFileSync(path.join(__dirname, 'templates', template), {
    encoding: 'utf8'
  });

  var directoryToWriteTo = process.cwd();

  var outfile = path.join(directoryToWriteTo, template);
  createDirectory(path.dirname(outfile));
  fs.writeFileSync(outfile, contents);
  console.log('Wrote ' + outfile);
}

console.log('Installing npm dependencies');
async.each([
  'express@4.12.4',
  'babel@5.4.7',
  'babel-core@5.4.7',
  'babel-loader@5.1.3',
  'react@0.13.3',
  'lodash@3.9.1',
  'react-router@0.13.3',
  'nodemon@1.3.7',
  'webpack-dev-server@1.9.0'
], install, function(err) {
  console.log('Dependencies installed');
  console.log('Creating index.js');
  writeTemplate('index.js');
  writeTemplate('layouts/default.js');
  writeTemplate('pages/index.js');
  writeTemplate('posts/hello-world.js');
  writeTemplate('public/favicon.ico');

  createDirectory('public/js');
  createDirectory('cannon-out');
});


