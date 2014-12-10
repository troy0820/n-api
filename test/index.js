var n = require('../');
var assert = require('chai').assert;
var exec = require('child_process').execSync;
var path = require('path');

log.level = 'verbose';

describe('n-api', function () {
  beforeEach(function () { n(process.version); });
  afterEach(function () { n(process.version); });

  describe('#constructor', function () {
    it('should set global node version', function () {
      n('0.8.x');
      
      assert.match(exec('node -v').toString(), /v0\.8/);
      assert.match(n.current(), /0\.8/);
    });

  });
  describe('#prev', function () {
    before(function () {
      n('0.10');
      n('0.8');
    });
    it('should switch back to 0.8', function () {
      n.prev();
      assert.match(exec('node -v').toString(), /v0\.8/);
      assert.match(n.current(), /0\.8/);
    });

  });
  describe('#current', function () {
    it('should return the current node version (0.8.x)', function () {
      n('0.8.x');
      assert.match(n.current(), /0\.8\./);
    });
    it('should return the current node version (0.10)', function () {
      n('0.10');
      assert.match(n.current(), /0\.10\./);
    });
    it('should return the current node version (0.11.13)', function () {
      n('0.11.13');
      assert.match(n.current(), /0\.11\.13/);
    });

  });
  describe('#ls', function () {

    it('should return full node version list', function () {
      var list = n.ls();

      assert.operator(list.length, '>', 10);
    });
    it('should contain testific versions', function () {
      var list = n.ls();

      assert.include(list, '0.11.13');
      assert.include(list, '0.8.26');
      assert.include(list, '0.8.27');
      assert.include(list, '0.10.29');
    });
  });

  describe('#use', function () {
    this.timeout(30 * 1000);
    before(function () {
      n('0.11.13');
      n('0.8.27');
      n('0.10.29');
    });
    it('can spawn a node process with arbitrary version', function () {
      assert.equal(n.use.sync('0.11.13', 'test/use-process.js').toString().trim(), 'v0.11.13');
      assert.equal(n.use.sync('0.8.27', 'test/use-process.js').toString().trim(), 'v0.8.27');
      assert.equal(n.use.sync('0.10.29', 'test/use-process.js').toString().trim(), 'v0.10.29');

      n('0.10.26');
      n('latest');
      assert.equal(n.use.sync('0.10.26', 'test/use-process.js').toString().trim(), 'v0.10.26');
    });
  });

  describe('#bin', function () {
    it('should return path of current node', function () {
      assert.equal(n.bin(process.version), path.resolve('/usr/local/n/versions', process.version.replace('v', ''), 'bin/node'));
    });
    it('should return path of another installed node', function () {
      n('0.10.26');
      assert.equal(n.bin('0.10.26'), '/usr/local/n/versions/0.10.26/bin/node');
    });
    it('returns null if node not installed', function () {
      assert.equal(n.bin('0.6.0'), null);
    });
  });
});
