/* jshint esnext:true, node:true, expr:true */
/* global log, cwd, pkg */

'use strict';

var _ = require('lodash');
var path = require('path');
var proc = require('child_process');
var semver = require('semver');
var home = require('home-dir');

global.cwd = process.cwd();
global.log = require('npmlog');
log.heading = 'n';

function fixPermissions () {
  var isRoot = process.getuid && process.getuid() === 0;
  if (isRoot) {
    try {
      // as in https://github.com/xtuple/xtuple-server/blob/070116365dff4dec4bfbb4345562dfd12c38c558/bootstrap.sh#L74
      //proc.spawnSync('mkdir', [ '-p', '/usr/local/{share/man,bin,lib/node,lib/node_modules,include/node,n/versions}' ]);
      proc.spawnSync('chmod', [ '-Rf', '777', '/usr/local/share/systemtap' ]);
      proc.spawnSync('chmod', [ '-Rf', '777', '/usr/local/share/man' ]);
      proc.spawnSync('chmod', [ '-Rf', '777', '/usr/local/bin' ]);
      proc.spawnSync('chmod', [ '-Rf', '777', '/usr/local/lib/node*' ]);
      proc.spawnSync('chmod', [ '-Rf', '777', '/usr/local/include/node*' ]);
      proc.spawnSync('chmod', [ '-Rf', '777', '/usr/local/n*' ]);
      proc.spawnSync('chmod', [ '-Rf', '777', '/usr/local/lib/dtrace' ]);
      proc.spawnSync('chmod', [ '-Rf', '777', path.resolve(home(), '.npm') ]);
      proc.spawnSync('chmod', [ '-Rf', '777', path.resolve(home(), 'tmp') ]);
      proc.spawnSync('chmod', [ '-Rf', '777', path.resolve('/root', '.npm') ]);
      proc.spawnSync('chmod', [ '-Rf', '777', path.resolve('/root', 'tmp') ]);
    }
    catch (e) {
      log.verbose('n-api', 'error message', e.message);
      log.silly('n-api', 'error', e.stack.split('\n'));
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
  log.verbose('n', sanitize(version));
  var result = proc.execSync('n ' + sanitize(version)).toString().trim();
  fixPermissions();
  return result;
};

n.use = {
  sync: function (version, cmd) {
    log.verbose('use.sync', version, cmd);
    
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
  log.verbose('ls');
  var ls = proc.execSync('n ls').toString().trim();
  return ls.match(/(\d+\.\d+\.\d+)/g);
};

n.current = function () {
  return proc.execSync('node -v').toString().trim().replace(/^v/, '');
};

module.exports = n;
