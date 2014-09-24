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
				app.run({}, function () {
					
					// Define the route generator
					that.app = helpers.createGenerator('hapijs:route', [
						'../../generators/route'
					]);
					done();
				});

			}.bind(this));
		});

		it('adds the expected route', function (done) {
			
			var expected = "{\
      	method: 'GET',\
      	path: '/items',\
      	config : {\
      		description: 'This is my description',\
        	handler: 'findEm'\
      	}\
    	}";

			helpers.mockPrompt(this.app, {
				'route': '/items',
				'module': 'items',
				'methodType': 'GET',
				'description': 'This is my description',
				'handler': 'findEm'
			});
			this.app.options['skip-install'] = true;
			this.app.run({}, function () {
				helpers.assertFile(expected);
				assert.fileContent('temp/item-route.js', expected);
				done();
			});
		});
	});

	/*
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
					'modules/items',
					'modules/items/item-ctrl.js',
					'modules/items/item-dao.js',
					'modules/items/item-test.js',
	        'modules/items/item-routes.js'
				];
	
				this.app.options['skip-install'] = true;
				this.app.run({}, function () {
					helpers.assertFile(expected);
					done();
				});
			});
		});*/
	
});
