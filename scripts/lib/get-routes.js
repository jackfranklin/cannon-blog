#!/usr/bin/env node
require('babel/register');

var findAndLoadPages = require('../../server/pages');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

module.exports = function(cb) {
  const pwd = process.cwd();

  findAndLoadPages(function(err, pages) {
    pages = pages.map(function(page) {
      return page.path;
    });

    var routes = {};
    pages.forEach(function(page) {
      var name = page.replace('.js', '');

      routes[page.replace('.js', '')] = {
        path: path.join(pwd, 'pages', page),
        name: name,
        url: name === 'index' ? '/' : name
      }
    });

    cb(err, routes);
  });
};
