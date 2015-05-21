import express from 'express';
import http from 'http';

import render from './render';

var app = express();

app.use(render);
const server = http.createServer(app);

server.listen('8123');

server.on('listening', () => {
  console.log('Server running on localhost:8123');
});


