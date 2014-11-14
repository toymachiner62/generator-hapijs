// This is a file generated by the yeoman generator hapijs

/**
 * Unit tests for all the <%= name %> endpoints
 *
 * @type {exports}
 */

var Lab = require('lab');
var server = require('../../index');
var lab = exports.lab = Lab.script();

/**
 * All the tests related to tasks
 */
lab.experiment('Creating <%= name %>', function() {

  lab.test('should be successful', function (done) {
    var options = {
      method: 'POST',
      url: '/<%= pluralName %>',
      payload: {

      }
    };

    server.inject(options, function (response) {
      var result = response.result;

      Lab.expect(response.statusCode).to.equal(200);

      done();
    });
  });

});

lab.experiment('Fetching <%= pluralName %>', function() {

  lab.test('should be successful', function (done) {
    var options = {
      method: 'GET',
      url: '/<%= pluralName %>',
      payload: {

      }
    };

    server.inject(options, function (response) {
      var result = response.result;

      Lab.expect(response.statusCode).to.equal(200);

      done();
    });
  });

});

