/* jshint esnext:true, node:true, expr:true */
/* global log, cwd, pkg */

'use strict';

var _ = require('lodash');
var proc = require('child_process');
var semver = require('semver');

global.cwd = process.cwd();
global.log = require('npmlog');
log.heading = 'n';

function sanitize (version) {
  return version.replace(/\.x/, '');
}

var n = function (version) {
  log.info('n', sanitize(version));
  return proc.execSync('n ' + sanitize(version)).toString().trim();
};

n.use = {
  sync: function (version, cmd) {
    log.info('use.sync', version);
    log.verbose('use.sync', cmd);
    
    return proc.execSync('n use ' + sanitize(version) + ' ' + cmd);
  }
};

/**
 * Returns a list of the available node versions
 */
n.ls = function () {
  log.info('ls');
  var ls = proc.execSync('n ls').toString().trim();
  return ls.match(/(\d+\.\d+\.\d+)/g);
};

n.current = function () {
  return proc.execSync('node -v').toString().trim().replace(/^v/, '');
};

module.exports = n;
