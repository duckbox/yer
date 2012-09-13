exports.face = function () {

	var fs = require('fs');

	var Creed = fs.readFileSync(__dirname+'/creed.txt', 'ascii');
  	return Creed;
};

exports.steven = function () {

	var fs = require('fs');

	var Creed = fs.readFileSync(__dirname+'/steven.txt', 'ascii');
  	return Creed;

};

exports.template = function( type, opts ) {

	var fs = require('fs'),
		_ = require('underscore');

	var name = opts.project;

	if( type === 'vanilla' ) {
		return {
			dirs : ['css','css/src','img','js','js/lib','js/src','js/node_modules'],

			files : {
				'index.html' : _.template(fs.readFileSync(__dirname+'/templates/vanilla/index.html', 'ascii'), opts ),
				'css/src/layout.scss' : '',
				'css/src/norm.css' : '',
				'js/package.json' : _.template(fs.readFileSync(__dirname+'/templates/vanilla/package.json', 'ascii'), opts),
				'js/grunt.js' : _.template(fs.readFileSync(__dirname+'/templates/vanilla/grunt.js', 'ascii'), { project : name, files : '[\'lib/jquery.min.js\',\'src/app.js\']' }),
				'js/src/app.js': '$(function(){\n\n 	console.log("'+name+' init");\n\n});'
			}

		}
	}

};

exports.index = function () {

	var fs = require('fs');

	var Creed = fs.readFileSync(__dirname+'/templates/vanilla/index.html', 'ascii');
  	return Creed;
  	
};

exports.syncGrunt = function( opts ) {

	return require('underscore').template(require('fs').readFileSync(__dirname+'/templates/vanilla/grunt.js', 'ascii'), opts);
				
};