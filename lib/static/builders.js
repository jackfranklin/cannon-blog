import request from 'superagent';
import fs from 'fs';
import { mkdirP as mkdirPCallback } from 'mkdirp';
import denodeify from 'denodeify';
import url from 'url';
import path from 'path';

const mkdirP = denodeify(mkdirPCallback);
const writeFile = denodeify(fs.writeFile);

export function fetchPage(host, pagePath) {
  return new Promise(function(resolve, reject) {
    const pageUrl = host + pagePath;

    request.get(pageUrl).accept('text/html').end(function(err, res) {
      if (err) {
        return reject(err);
      }

      if (res.ok) {
        resolve([pageUrl, res.text]);
      } else {
        reject([pageUrl, res.text]);
      }
    });
  });
}

export function writePage(baseDir, [pageUrl, content]) {
  const pathname = url.parse(pageUrl).pathname;
  const filename = path.join(baseDir, pathname, 'index.html');

  return mkdirP(path.dirname(filename))
    .then(() => writeFile(filename, content))
    .then(() => filename);
}

export function fetchRoutes() {
  return new Promise(function(resolve, reject) {
    request.get('http://localhost:8123/__cannon/routes').end((err, res) => {
      if (res.ok) {
        resolve(res.body);
      } else {
        reject(res.text);
      }
    });
  });
}

