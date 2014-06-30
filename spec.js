var n = require('./');
var assert = require('chai').assert;

describe('n-api', function () {
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
