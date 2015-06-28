import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import url from 'url';
import React from 'react';
import Router, { Route } from 'react-router';

import generateClientBootstrap from '../client/generate-bootstrap';

import CannonHtmlDocument from '../react/html-document';
import turnRouteIntoReactRoute from '../cannon-route-to-react';

require('babel/register');

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

export default function(options = {}) {

  return function(req, res, next) {
    const isHtml = req.headers.accept && req.accepts('html');

    if (!isHtml) return next();

    generateClientBootstrap({
      routes: res.locals.cannon.routes,
      layouts: res.locals.cannon.layouts,
      data: res.locals.cannon.data,
      config: res.locals.cannon.config
    });

    let config = res.locals.cannon.config;

    const routes = _.map(res.locals.cannon.routes, turnRouteIntoReactRoute);

    const router = Router.create({
      routes,
      location: normaliseUrl(req.url)
    });

    router.run(function(Handler, state) {
      let matchedRoute = findRouteFromPath(res.locals.cannon.routes, state.path);
      //TODO: deal with matchedRoute being undefined
      let matchedLayout = matchedRoute.meta.layout || 'default';

      let layout = _.find(res.locals.cannon.layouts, (layout) => layout.name === matchedLayout);

      //TODO: what if there is not a found layout?
      let LayoutComponent = require(layout.path);

      // TODO: the below can definitely be tidied up!
      const output = React.renderToString(
        <LayoutComponent router={router} route={matchedRoute} routes={res.locals.cannon.routes}>
        <Handler route={matchedRoute} routes={res.locals.cannon.routes} data={res.locals.cannon.data} />
        </LayoutComponent>
      );

      const HtmlDocument = (function() {
        if (res.locals.cannon.htmlDocument) {
          return require(res.locals.cannon.htmlDocument);
        } else {
          return CannonHtmlDocument;
        }
      })();

      const pageTitle = (function() {
        let routeTitle = matchedRoute.meta.title;
        if (routeTitle) {
          return `${routeTitle} : ${config.title}`;
        } else {
          return config.title;
        }
      })();

      const html = React.renderToStaticMarkup(
        <HtmlDocument
        markup={output}
        router={router}
        title={pageTitle}
        script='http://localhost:8080/bundle.js'
        />
      );

      const doctype = '<!DOCTYPE html>';

      res.send(doctype + html);
    });
  };
};
