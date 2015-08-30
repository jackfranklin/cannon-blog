import _ from 'lodash';
import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import webpack from 'webpack';
import devConfig from './webpack.dev.config';
import prodConfig from './webpack.prod.config';

module.exports = function({ routes, layouts, data, config }) {
  console.log('Generating clientside entry point');

  const source = fs.readFileSync(path.join(__dirname, 'client.js.hbs'), { encoding: 'utf8' });

  routes = _.map(routes, function(route) {
    // as they get imported, name cannot contain / or -
    route.name = route.name.replace('/', '_');
    route.name = route.name.replace('-', '_');
    return route;
  });

  const compiledClient = Handlebars.compile(source)({
    routes,
    layouts,
    data: JSON.stringify(data, null, 2),
    config: JSON.stringify(config, null, 2),
    json: JSON.stringify(routes, null, 2),
    layoutsJson: JSON.stringify(layouts, null, 2)
  });

  fs.writeFileSync(path.join(process.cwd(), 'cannon-out', 'client.js'), compiledClient);

  console.log('Wrote client.js to', path.join(process.cwd(), 'cannon-out', 'client.js'));
}
