var n = require('./');
var assert = require('chai').assert;
var exec = require('child_process').execSync;

log.level = 'verbose';

describe('n-api', function () {
  afterEach(function () {
    n('latest');
  });

  describe('#constructor', function () {
    it('should set global node version', function () {
      n('0.8.x');
      
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
    it('should contain specific versions', function () {
      var list = n.ls();

      assert.include(list, '0.11.13');
      assert.include(list, '0.8.26');
      assert.include(list, '0.8.27');
      assert.include(list, '0.10.29');
    });

  });
});
