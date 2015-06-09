import _ from 'lodash';
import { fetchPage, writePage, fetchRoutes } from './builders';

function processRoute(route) {
  return fetchPage('http://localhost:8123', route)
    .then(writePage.bind(null, '__out'));
}

export default function() {
  return fetchRoutes().then((routes) => {
    var paths = _.map(routes.routes, (route) => route.path);
    return Promise.all(paths.map(processRoute));
  });
};
