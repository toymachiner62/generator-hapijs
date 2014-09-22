/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('hapi generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('hapijs:app', [
        '../../generators/app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
		this.timeout(5000);
    var expected = [
      // add files you expect to exist here.
			'bower.json',
			'package.json',
			'server.js',
      'modules'
    ];

   // helpers.mockPrompt(this.app, {
		//  'someOption': true
		//});
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
