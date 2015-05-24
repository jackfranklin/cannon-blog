import React from 'react';
import cannonRouter from '../cannon/router';
import Router from 'react-router';

import findAndLoadPages from './pages';
import path from 'path';

const pwd = process.cwd();

const routesJson = require(path.join(pwd, '_site', 'routes.json'));

export default function render(req, res, next) {
  const doctype = '<!DOCTYPE html>';

  findAndLoadPages(function(err, pages) {
    const routes = cannonRouter.buildFromPages(pages);

    const router = Router.create({
      routes: routes,
      location: req.url
    });

    router.run(function(Handler, state) {
      const output = React.renderToString(<Handler router={router} />);
      const routesInject = '<script>window._ROUTES = ' + JSON.stringify(routesJson) + ';</script>';
      const script = '<script src="bundle.js"></script>';
      res.send(doctype + output + routesInject + script);
    });
  });
}
