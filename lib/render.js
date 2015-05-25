import _ from 'lodash';
import url from 'url';
import React from 'react';
import Router, { Route } from 'react-router';

import CannonHtmlDocument from './react/html-document';

function turnRouteIntoReactRoute(route) {
  var Component = require(route.componentPath);
  return (
    <Route key={route.path}
      name={route.name}
      path={route.path}
      handler={Component}>
    </Route>
  );
};

function normalizeUrl(urlStr) {
  var parsedUrl = url.parse((urlStr || '').toLowerCase());
  parsedUrl.pathname = parsedUrl.pathname.replace(/^\/|\/$/g, '');
  parsedUrl.pathname = parsedUrl.pathname ? `/${parsedUrl.pathname}/` : '/';
  return url.format(parsedUrl);
}

export default function(options) {
  return function(req, res, next) {
    const routes = _.map(res.locals.cannon.routes, turnRouteIntoReactRoute);

    const router = Router.create({
      routes,
      location: normalizeUrl(req.url)
    });

    router.run(function(Handler, state) {
      const output = React.renderToString(<Handler router={router} />);
      const html = React.renderToStaticMarkup(<CannonHtmlDocument markup={output} />);

      const doctype = '<!DOCTYPE html>';

      res.send(doctype + html);
    });
  }
};
