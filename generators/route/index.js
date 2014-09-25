'use strict';
var util 				= require('util');
var yeoman 			= require('yeoman-generator');
var yosay 			= require('yosay');
var path 				= require('path');
var fs 					= require('fs');
var inflection 	= require('inflection');

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

		var prompts = [
			{
				type: 'input',
				name: 'route',
				message: 'Enter your route url (Example: /items or /items/:id)',
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

		// If a route name was passed in to the generator use it, else add a prompt to the user for the module name
		if (this.arguments[0]) {
			this.module = this.arguments[0];
		} else {
			// Add the module prompt as the 2nd prompt
			prompts.splice(1, 0, {
				type: 'input',
				name: 'module',
				message: 'What module would you like to add your route to?',
				required: true
			})
		}

		var done = this.async();

		this.prompt(prompts, function (answers) {
			this.route = answers.route;
			this.module = answers.module;
			this.methodType = answers.methodType;
			this.description = answers.description;
			this.handler = answers.handler;
			done();
		}.bind(this));

	},

	// Copy the code for the new route to the dao, ctrl, and routes file
	files: function () {

		var module = inflection.singularize(this.module);
		var pluralModule = inflection.pluralize(this.module);
		var daoName = inflection.camelize(module, true) + 'Dao';
		var controllerName = inflection.camelize(module, true) + 'Controller';

		// THE INDENTATION OF THIS VARIABLE IS IMPORTANT EVEN THOUGH IT LOOKS MESSY AS HELL
		var routeToAdd = ",\n\
		\n\
		{\n\
			method: '" + this.methodType + "',\n\
			path: '" + this.route + "',\n\
			config : {\n\
				description: '" + this.description + "',\n\
				handler: " + controllerName + "." + this.handler + "\n\
			}\n\
		}";

		// THE INDENTATION OF THIS VARIABLE IS IMPORTANT EVEN THOUGH IT LOOKS MESSY AS HELL
		var ctrlToAdd = "\
/**\n\
 * " + this.description + "\n\
 *\n\
 * @param req\n\
 * @param reply\n\
 */\n\
exports." + this.handler + " = function (req, reply) {\n\
\n\
	" + daoName + "." + this.handler + "(req.params.id, function (err, data) {\n\
		if (err) {\n\
			return reply(Boom.wrap(err));\n\
		}\n\
		\n\
		reply(data);\n\
	});\n\
};\n\
";

		// THE INDENTATION OF THIS VARIABLE IS IMPORTANT EVEN THOUGH IT LOOKS MESSY AS HELL
		var daoToAdd = "\
/**\n\
 * " + this.description + "\n\
 *\n\
 * @param callback\n\
 */\n\
exports." + this.handler + " = function(callback) {\n\
	// TODO: Implement dao method and call callback(null, <data>)\n\
	return callback(Boom.notImplemented());\n\
};\n\
";

		// TODO: Refactor this into method and figure out how to get route comma to start after last route and not two lines past it
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

	}
});

module.exports = RouteGenerator;