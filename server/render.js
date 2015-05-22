import React from 'react';
import cannonRouter from '../cannon/router';
import Router from 'react-router';

import findAndLoadPages from './pages';

const pwd = process.cwd();

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
      res.send(doctype + output);
    });
  });
}
