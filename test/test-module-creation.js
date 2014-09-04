/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('module generator', function () {
		describe('when no argument is provided. i.e. $ yo hapijs:module', function() {

				beforeEach(function (done) {
						helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
								if (err) {
										return done(err);
								}

								this.app = helpers.createGenerator('hapijs:module', [
										'../../generators/module'
								]);
								done();
						}.bind(this));
				});

				it('creates expected files', function (done) {
						var expected = [
								// add files you expect to exist here.
								'modules/item',
								'modules/item/item-ctrl.js',
								'modules/item/item-dao.js',
								'modules/item/item-test.js',
								'modules/item/item-route.js'
						];

						helpers.mockPrompt(this.app, {
								'name': 'item'
						});
						this.app.options['skip-install'] = true;
						this.app.run({}, function () {
								helpers.assertFile(expected);
								done();
						});
				});
		});

		describe('when the argument "item" is provided. i.e. $ yo hapijs:module item', function() {

				beforeEach(function (done) {
						helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
								if (err) {
										return done(err);
								}

								this.app = helpers.createGenerator('hapijs:module', [
										'../../generators/module'
								], 'item');
								done();
						}.bind(this));
				});

				it('creates expected files', function (done) {
						var expected = [
								// add files you expect to exist here.
								'modules/item',
								'modules/item/item-ctrl.js',
								'modules/item/item-dao.js',
								'modules/item/item-test.js',
                'modules/item/item-route.js'
						];

						this.app.options['skip-install'] = true;
						this.app.run({}, function () {
								helpers.assertFile(expected);
								done();
						});
				});
		});
});
