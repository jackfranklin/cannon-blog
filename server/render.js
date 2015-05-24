import React from 'react';
import cannonRouter from '../cannon/router';
import Router from 'react-router';

import findAndLoadPages from './pages';
import path from 'path';
import url from 'url';

const pwd = process.cwd();

const routesJson = require(path.join(pwd, '_site', 'routes.json'));

class HtmlDocument extends React.Component {
  render() {
    return (
      <body>
        <div id='root' />
        <script src='bundle.js'></script>
      </body>
    );
  }

}

function normalizeUrl(urlStr) {
  var parsedUrl = url.parse((urlStr || '').toLowerCase());
  parsedUrl.pathname = parsedUrl.pathname.replace(/^\/|\/$/g, '');
  parsedUrl.pathname = parsedUrl.pathname ? `/${parsedUrl.pathname}/` : '/';
  return url.format(parsedUrl);
}

export default function render(req, res, next) {
  console.log('Server got request', req.url);
  const doctype = '<!DOCTYPE html>';

  findAndLoadPages(function(err, pages) {
    const routes = cannonRouter.buildFromPages(pages);

    const router = Router.create({
      routes: routes,
      location: normalizeUrl(req.url)
    });

    router.run(function(Handler, state) {
      const output = React.renderToString(<Handler router={router} />);
      const html = React.renderToStaticMarkup(
        <HtmlDocument markup={output} />
      );

      res.send(doctype + html);
    });
  });
}
