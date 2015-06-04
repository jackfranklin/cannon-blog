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

function findRouteFromPath(routes, routePath) {
  return _.find(routes, (route) => route.path === routePath);
}

export default function(options) {

  return function(req, res, next) {
    const isHtml = req.headers.accept && req.accepts('html');

    if (!isHtml) return next();

    generateClientBootstrap({
      routes: res.locals.cannon.routes,
      layouts: res.locals.cannon.layouts
    }, function() {
      const routes = _.map(res.locals.cannon.routes, turnRouteIntoReactRoute);

      const router = Router.create({
        routes,
        location: normaliseUrl(req.url)
      });

      router.run(function(Handler, state) {
        let matchedRoute = findRouteFromPath(res.locals.cannon.routes, state.path);
        let matchedLayout = matchedRoute.meta.layout || 'default';

        let layout = _.find(res.locals.cannon.layouts, (layout) => layout.name === matchedLayout);

        let LayoutComponent = require(layout.path);

        const output = React.renderToString(
          <LayoutComponent>
            <Handler routes={res.locals.cannon.routes} />
          </LayoutComponent>
        );

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
