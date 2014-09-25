/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('route generator', function () {
	describe('when no argument is provided. i.e. $ yo hapijs:route', function() {

		beforeEach(function (done) {
			helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
				
				if (err) {
					return done(err);
				}
				
				var that = this;
				
				// Run the module generator to generate some files to add routes to
				var app = helpers.createGenerator('hapijs:module', [
					'../../generators/module'
				]);
				
				helpers.mockPrompt(app, {
					'name': 'items'
				});
				
				app.options['skip-install'] = true;

				// Run the generator to create some files to test with
				app.run({}, function () {
					
					// Define the route generator
					that.app = helpers.createGenerator('hapijs:route', [
						'../../generators/route'
					]);

					// Mock the prompts that are used for each of the tests
					helpers.mockPrompt(that.app, {
						'route': '/items',
						'module': 'items',
						'methodType': 'GET',
						'description': 'This is my description',
						'handler': 'findEm'
					});
					that.app.options['skip-install'] = true;
					done();
				});

			}.bind(this));
		});


		it('adds the expected route', function (done) {
			
		var expected = ",\n\
		\n\
		{\n\
			method: 'GET',\n\
			path: '/items',\n\
			config : {\n\
				description: 'This is my description',\n\
				handler: itemController.findEm\n\
			}\n\
		}";

			this.app.run({}, function () {
				helpers.assertFileContent(path.resolve(process.cwd(), 'modules', 'items', 'item-routes.js'), RegExp(expected));
				done();
			});
		});


		it('adds the expected controller method', function (done) {

var expected = "\n\
/\\*\\*\n\
 \\* This is my description\n\
 \\*\n\
 \\* @param req\n\
 \\* @param reply\n\
 \\*/\n\
exports.findEm = function \\(req, reply\\) {\n\
\n\
	itemDao.findEm\\(req.params.id, function \\(err, data\\) {\n\
		if \\(err\\) {\n\
			return reply\\(Boom.wrap\\(err\\)\\);\n\
		}\n\
		\n\
		reply\\(data\\);\n\
	}\\);\n\
};\n\
";

			this.app.run({}, function () {
				helpers.assertFileContent(path.resolve(process.cwd(), 'modules', 'items', 'item-ctrl.js'), RegExp(expected));
				done();
			});
		});


		it('adds the expected dao method', function (done) {

var expected = "\
/\\*\\*\n\
 \\* This is my description\n\
 \\*\n\
 \\* @param callback\n\
 \\*/\n\
exports.findEm = function\\(callback\\) {\n\
	// TODO: Implement dao method and call callback\\(null, <data>\\)\n\
	return callback\\(Boom.notImplemented\\(\\)\\);\n\
};\n\
";

			this.app.run({}, function () {
				helpers.assertFileContent(path.resolve(process.cwd(), 'modules', 'items', 'item-dao.js'), RegExp(expected));
				done();
			});
		});
	});


	describe('when no argument is provided. i.e. $ yo hapijs:route item', function() {

		beforeEach(function (done) {
			helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {

				if (err) {
					return done(err);
				}

				var that = this;

				// Run the module generator to generate some files to add routes to
				var app = helpers.createGenerator('hapijs:module', [
					'../../generators/module'
				]);

				helpers.mockPrompt(app, {
					'name': 'items'
				});

				app.options['skip-install'] = true;
				app.run({}, function () {

					// Define the route generator
					that.app = helpers.createGenerator('hapijs:route', [
						'../../generators/route'
					], 'item');

					helpers.mockPrompt(that.app, {
						'route': '/items',
						'module': 'items',
						'methodType': 'GET',
						'description': 'This is my description',
						'handler': 'findEm'
					});
					that.app.options['skip-install'] = true;
					done();
				});

			}.bind(this));
		});


		it('adds the expected route', function (done) {

			var expected = ",\n\
		\n\
		{\n\
			method: 'GET',\n\
			path: '/items',\n\
			config : {\n\
				description: 'This is my description',\n\
				handler: itemController.findEm\n\
			}\n\
		}";

			this.app.run({}, function () {
				helpers.assertFileContent(path.resolve(process.cwd(), 'modules', 'items', 'item-routes.js'), RegExp(expected));
				done();
			});
		});
	});
	
});
