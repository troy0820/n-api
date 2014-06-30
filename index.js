/* jshint esnext:true, node:true, expr:true */
/* global log, cwd, pkg */

'use strict';

var _ = require('lodash');
var exec = require('child_process').execSync;
var semver = require('semver');

global.cwd = process.cwd();
global.log = require('npmlog');

function sanitize (version) {
  return version.replace(/\.x/, '');
}

var n = function (version) {
  log.info('n', sanitize(version));
  return exec('n ' + sanitize(version)).toString().trim();
};

/**
 * Returns a list of the available node versions
 */
n.ls = function () {
  log.info('n ls');
  var ls = exec('n ls').toString().trim();
  return ls.match(/(\d+\.\d+\.\d+)/g);
};

n.current = function () {
  return exec('node -v').toString().trim().replace(/^v/, '');
};

module.exports = n;
