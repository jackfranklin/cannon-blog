var cannon = require('cannon-blog');
var express = require('express');
var http = require('http');

var app = express();

app.use(express.static('public'));

app.use(cannon.init({
  title: 'My Blog'
}));

app.use(cannon.layouts({
  default: 'layouts/default.js'
}));

app.use(cannon.pages({
  directory: 'pages',
  glob: '*.js'
}));

app.use(cannon.posts({
  directory: 'posts',
  glob: '*.js'
}));

app.use(cannon.expose());

app.use(cannon.render());

var server = http.createServer(app);

server.listen('8123');

server.on('listening', function() {
  console.log('Server running on localhost:8123');
});


