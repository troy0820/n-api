/* jshint esnext:true, node:true, expr:true */
/* global log, cwd, pkg */

'use strict';

var _ = require('lodash');
var exec = require('child_process').execSync;
var semver = require('semver');

global.cwd = process.cwd();
global.log = require('npmlog');

log.level = 'verbose';

var n = exports;

/**
 * Returns a list of the available node versions
 */
n.ls = function () {
  var ls = exec('n ls').toString().trim();
  return ls.match(/(\d+\.\d+\.\d+)/g);
};
