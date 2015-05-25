import _ from 'lodash';
import url from 'url';
import React from 'react';
import Router, { Route } from 'react-router';

import generateClientBootstrap from './client/generate-bootstrap';

import CannonHtmlDocument from './react/html-document';
import turnRouteIntoReactRoute from './react-route';

export default function(options) {
  const renderForClient = options.client === false || true;

  return function(req, res, next) {
    generateClientBootstrap({
      routes: res.locals.cannon.routes
    }, function() {
      const routes = _.map(res.locals.cannon.routes, turnRouteIntoReactRoute);

      const router = Router.create({
        routes,
        location: req.url
      });

      router.run(function(Handler, state) {
        const output = React.renderToString(<Handler />);

        const html = React.renderToStaticMarkup(
          <CannonHtmlDocument
          markup={output}
          renderForClient={renderForClient}
          router={router}
          />
        );

        const doctype = '<!DOCTYPE html>';

        res.send(doctype + html);
      });
    });
  }
};
