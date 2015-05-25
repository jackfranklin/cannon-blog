import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import url from 'url';
import React from 'react';
import Router, { Route } from 'react-router';

import generateClientBootstrap from './client/generate-bootstrap';

import CannonHtmlDocument from './react/html-document';
import turnRouteIntoReactRoute from './react-route';

function normaliseUrl(reqUrl) {
  if (reqUrl.length > 1) {
    if (reqUrl.slice(-1) !== '/') {
      return reqUrl + '/';
    }
  }

  return reqUrl;
}

export default function(options) {

  return function(req, res, next) {
    const isHtml = req.headers.accept && req.accepts('html');

    if (!isHtml) return next();

    generateClientBootstrap({
      routes: res.locals.cannon.routes
    }, function() {
      const routes = _.map(res.locals.cannon.routes, turnRouteIntoReactRoute);

      const router = Router.create({
        routes,
        location: normaliseUrl(req.url)
      });

      router.run(function(Handler, state) {
        const output = React.renderToString(<Handler />);

        const html = React.renderToStaticMarkup(
          <CannonHtmlDocument
            markup={output}
            router={router}
            script='/js/bundle.js'
          />
        );

        const doctype = '<!DOCTYPE html>';

        res.send(doctype + html);
      });
    });
  }
};
