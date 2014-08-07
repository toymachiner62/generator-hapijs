'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var fs = require('fs');


var ModuleGenerator = yeoman.generators.Base.extend({
  init: function () {
    if (this.arguments[0]) {
      console.log('You called the module subgenerator with the argument ' + this.arguments[0] + '.');
    } else {
      console.log('You called the module subgenerator with no arguments.');
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

  	// Create a directory with the name of the module
		fs.mkdirSync(path.resolve(this.name), function(err) {
			if (err && err.code != 'EEXIST') { // ignore the error if the folder already exists
				// TODO: Handle error
				console.log('error:');
				console.log(err);
			}
    });

		// Copy the template files with the correct name
    this.copy('module-ctrl.js', path.resolve(this.name, this.name+'-ctrl.js'));
		this.copy('module-dao.js', path.resolve(this.name, this.name+'-dao.js'));
		this.copy('module-test.js', path.resolve(this.name, this.name+'-test.js'));
		this.copy('module-route.js', path.resolve(this.name, this.name+'-route.js'));
  }
});

module.exports = ModuleGenerator;