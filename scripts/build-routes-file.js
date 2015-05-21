#!/usr/bin/env node


require('babel/register');

var findAndLoadPages = require('../server/pages');

findAndLoadPages(function(err, pages) {
  pages = pages.map(function(page) {
    return page.path;
  });
  console.log('found pages', pages);
});
