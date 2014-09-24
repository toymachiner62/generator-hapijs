'use strict';
var util 				= require('util');
var yeoman 			= require('yeoman-generator');
var yosay 			= require('yosay');
var path 				= require('path');
var fs 					= require('fs');
var inflection 	= require('inflection');

var modulesDir = path.resolve('./modules');
var MARKER = "/* Add new methods above */";

var RouteGenerator = yeoman.generators.Base.extend({
	init: function () {

		// Have Yeoman reiterate what the user did
		if (this.arguments[0]) {
			this.log(yosay('You called the route subgenerator with the argument "' + this.arguments[0] + '".'));
		} else {
			this.log(yosay('You called the route subgenerator with no arguments.'));
		}
	},

	// Prompt the user if they did not enter a module name
	promptTask: function() {

		// If a route name was passed in to the generator use it, else prompt the user for the route name
		if (this.arguments[0]) {
			this.route = this.arguments[0];
		} else {
			var done = this.async();
			
			var prompts = [
				{	
					type: 'input',
					name: 'route',
					message: 'Enter your route url (Example: /items or /items/:id)',
					required: true
				},
				{
					type: 'input',
					name: 'module',
					message: 'What module would you like to add your route to?',
					required: true
				},
				{
					type: 'list',
					name: 'methodType',
					message: 'What type of method is this route?',
					choices: ["GET", "POST", "PUT", "DELETE"]
				},
				{
					type: 'input',
					name: 'description',
					message: 'Give a brief description of this route?'
				},
				{
					type: 'input',
					name: 'handler',
					message: 'What would you like to name your method handler?'
				}
			];
			
			this.prompt(prompts, function (answers) {
				this.route = answers.route;
				this.module = answers.module;
				this.methodType = answers.methodType;
				this.handler = answers.handler;
				done();
			}.bind(this));
		}
	},

	// Copy all the template files for the module
	files: function () {

		var routeToAdd = ",\
			\
			{\
    		method: '" + this.methodType + "',\
      	path: '" + this.route + "',\
      	config : {\
      		description: '" + this.description + "',\
        	handler: '" + this.handler + "'\
      	}\
    	}\
		";
		
		var ctrlToAdd = "\
			/**\
			 * Remove a specific <%= name %> by id\
			 *\
			 * @param req\
			 * @param reply\
			 */\
			 exports.remove = function (req, reply) {\
				 \
				 <%= daoName %>.remove(req.params.id, function (err, data) {\
					 if (err) {\
						 return reply(Boom.wrap(err));\
					 }\
					 reply(data);\
				 });\
			 };\
		";
		
		var daoToAdd = "\
			/**\
			 * Get's all <%= pluralName %>\
			 *\
			 * @param callback\
			 */\
			 exports.find = function (callback) {\
				 // TODO: Implement dao method and call callback(null, <data>)\
				 return callback(Boom.notImplemented());\
			 };\
		";
		
		var module = inflection.singularize(this.module);
		var pluralModule = inflection.pluralize(this.module);

		var routePath = path.resolve(process.cwd(), 'modules', pluralModule, module + "-routes.js");
		var ctrlPath = path.resolve(process.cwd(), 'modules', pluralModule, module + "-ctrl.js");
		var daoPath = path.resolve(process.cwd(), 'modules', pluralModule, module + "-dao.js");
		var routeSrc = fs.readFileSync(routePath, 'utf8');
		var ctrlSrc = fs.readFileSync(ctrlPath, 'utf8');
		var daoSrc = fs.readFileSync(daoPath, 'utf8');
		var indexOfRoute = routeSrc.indexOf(MARKER);
		var indexOfCtrl = ctrlSrc.indexOf(MARKER);
		var indexOfDao = daoSrc.indexOf(MARKER);
		var lineStartRoute = routeSrc.substring(0, indexOfRoute).lastIndexOf('\n') + 1;
		var lineStartCtrl = ctrlSrc.substring(0, indexOfCtrl).lastIndexOf('\n') + 1;
		var lineStartDao = daoSrc.substring(0, indexOfDao).lastIndexOf('\n') + 1;
		var indentRoute = routeSrc.substring(lineStartRoute,indexOfRoute);
		var indentCtrl = ctrlSrc.substring(lineStartCtrl,indexOfCtrl);
		var indentDao = daoSrc.substring(lineStartDao,indexOfDao);
		routeSrc = routeSrc.substring(0,indexOfRoute) + routeToAdd + "\n" + indentRoute + routeSrc.substring(indexOfRoute);
		ctrlSrc = ctrlSrc.substring(0,indexOfCtrl) + ctrlToAdd + "\n" + indentCtrl + ctrlSrc.substring(indexOfCtrl);
		daoSrc = daoSrc.substring(0,indexOfDao) + daoToAdd + "\n" + indentDao + daoSrc.substring(indexOfDao);
		fs.writeFileSync(routePath,routeSrc);
		fs.writeFileSync(ctrlPath,ctrlSrc);
		fs.writeFileSync(daoPath,daoSrc);
		
		// Default preference of using plural names for somethings, and singular for others
		//this.name = inflection.singularize( this.name );
		//this.pluralName = inflection.pluralize( this.name );
		//this.daoName = inflection.camelize( this.name, true ) + 'Dao';
		//this.controllerName = inflection.camelize( this.name, true ) + 'Controller';

		// Create the modules directory if it doesn't already exist
		//if (!fs.existsSync(modulesDir)) {
			//fs.mkdirSync(modulesDir, function (err) {
				//if (err) {
					// TODO: Handle error
					//console.log('error:');
					//console.log(err);
					//}
			//});
			//}

		// Create a directory with the name of the module inside the modules directory if it doesn't already exist
		//var newModuleDir = path.join(modulesDir, this.pluralName);
		//if (fs.existsSync(newModuleDir)) {
			//console.log('error:');
			//console.log('New module directory already exists - ' + newModuleDir);
			//return;
			//}
		//fs.mkdirSync(newModuleDir, function(err) {
			//if (err) {
				// TODO: Handle error
				//console.log('error:');
				//console.log(err);
				//}
		//});

		// Copy the template files with the correct name
		//var newBaseFileName = path.join(newModuleDir, this.name);
		//this.mkdir('modules');
		//this.copy('module-ctrl.js', path.resolve(newBaseFileName + '-ctrl.js'));
		//this.copy('module-dao.js', path.resolve(newBaseFileName + '-dao.js'));
		//this.copy('module-test.js', path.resolve(newBaseFileName + '-test.js'));
		//this.copy('module-routes.js', path.resolve(newBaseFileName + '-routes.js'));
	}
});

module.exports = RouteGenerator;