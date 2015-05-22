var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

var pwd = process.cwd();
var SITE_DIR = path.join(pwd, '_site');

function ensureSiteDirExists() {
  mkdirp(SITE_DIR);
}

function removeFile(file) {
  var p = path.join(SITE_DIR, file)
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

module.exports = function(file, contents) {
  ensureSiteDirExists();
  removeFile(file);

  return fs.writeFileSync(path.join(SITE_DIR, file), contents);
}
