'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var ModuleGenerator = yeoman.generators.Base.extend({
  init: function () {
    console.log('You called the module subgenerator with the argument ' + this.arguments.name + '.');
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
    this.copy('module-ctrl.js', this.name+'-ctrl.js');
		this.copy('module-dao.js', this.name+'-dao.js');
		this.copy('module-test.js', this.name+'-test.js');
		this.copy('module-route.js', this.name+'-route.js');
  }
});

module.exports = ModuleGenerator;