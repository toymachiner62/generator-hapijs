'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var path = require('path');
var fs = require('fs');
var inflection = require('inflection');
var modulesDir = path.resolve('./modules');

var ModuleGenerator = yeoman.generators.Base.extend({
	init: function () {

		// Have Yeoman reiterate what the user did
		if (this.arguments[0]) {
			this.log(yosay('You called the module subgenerator with the argument "' + this.arguments[0] + '".'));
		} else {
			this.log(yosay('You called the module subgenerator with no arguments.'));
		}
	},

	// Prompt the user if they did not enter a module name
	promptTask: function() {

		// If a module name was passed in to the generator use it, else prompt the user for the module name
		if (this.arguments[0]) {
			this.name = this.arguments[0];
		} else {
			var done = this.async();
			this.prompt({
				type: 'input',
				name: 'name',
				message: 'What do you want to call this module? (Example: item)',
				default: this.name
			}, function (answers) {
				this.name = answers.name;
				done();
			}.bind(this));
		}
	},

	// Copy all the template files for the module
	files: function () {

		// Default preference of using plural names for somethings, and singular for others
		this.name = inflection.singularize( this.name );
		this.pluralName = inflection.pluralize( this.name );
		this.daoName = inflection.camelize( this.name, true ) + 'Dao';
		this.controllerName = inflection.camelize( this.name, true ) + 'Controller';

		// Create the modules directory if it doesn't already exist
		if (!fs.existsSync(modulesDir)) {
			fs.mkdirSync(modulesDir, function (err) {
				if (err) {
					// TODO: Handle error
					console.log('error:');
					console.log(err);
				}
			});
		}

		// Create a directory with the name of the module inside the modules directory if it doesn't already exist
		var newModuleDir = path.join(modulesDir, this.pluralName);
		if (fs.existsSync(newModuleDir)) {
			console.log('error:');
			console.log('New module directory already exists - ' + newModuleDir);
			return;
		}
		fs.mkdirSync(newModuleDir, function(err) {
			if (err) {
				// TODO: Handle error
				console.log('error:');
				console.log(err);
			}
		});

		// Copy the template files with the correct name
		var newBaseFileName = path.join(newModuleDir, this.name);
		this.mkdir('modules');
		this.copy('module-ctrl.js', path.resolve(newBaseFileName + '-ctrl.js'));
		this.copy('module-dao.js', path.resolve(newBaseFileName + '-dao.js'));
		this.copy('module-test.js', path.resolve(newBaseFileName + '-test.js'));
		this.copy('module-routes.js', path.resolve(newBaseFileName + '-routes.js'));
	}
});

module.exports = ModuleGenerator;