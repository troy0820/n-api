/* jshint esnext:true, node:true, expr:true */
/* global log, cwd, pkg */

'use strict';

var _ = require('lodash');
var proc = require('child_process');
var semver = require('semver');

global.cwd = process.cwd();
global.log = require('npmlog');
log.heading = 'n';

function fixPermissions () {
  var isRoot = process.getuid && process.getuid() === 0;
  if (isRoot) {
    // as in https://github.com/xtuple/xtuple-server/blob/070116365dff4dec4bfbb4345562dfd12c38c558/bootstrap.sh#L74
    try {
      var chmod = proc.execSync('chmod -Rf a+wr /usr/local/{share/systemtap,share/man,bin,lib/node*,include/node*,n*}',
        { stdio: 'pipe' });
    }
    catch (e) {
      log.verbose('n-api', 'error message', e.message);
      log.verbose('n-api', 'chmod', chmod);
    }
  }
}

function sanitize (version) {
  if (_.isEmpty(version)) {
    throw new TypeError('version is not valid');
  }
  return version.replace(/\.x/, '');
}

var n = function (version) {
  log.info('n', sanitize(version));
  var result = proc.execSync('n ' + sanitize(version)).toString().trim();
  fixPermissions();
  return result;
};

n.use = {
  sync: function (version, cmd) {
    log.info('use.sync', version);
    log.verbose('use.sync', cmd);
    
    return proc.execSync('n use ' + sanitize(version) + ' ' + cmd);
  }
};

n.bin = function (version) {
  log.verbose('bin', version);
  try {
    return proc.execSync('n bin ' + sanitize(version)).toString().trim();
  }
  catch (e) {
    return null;
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
