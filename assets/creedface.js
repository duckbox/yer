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

exports.template = function( type, name ) {

	var fs = require('fs');

	if( type === 'vanilla' ) {
		return {
			dirs : ['css','css/src','img','js','js/lib','js/src','js/node_modules'],

			files : {
				'index.html' : (fs.readFileSync(__dirname+'/templates/vanilla/index.html', 'ascii')).replace(/\{project\}/g,name).replace(/\{script\}/,name+'.min.js'),
				'css/src/layout.scss' : '',
				'css/src/norm.css' : '',
				'js/package.json' : (fs.readFileSync(__dirname+'/templates/vanilla/package.json', 'ascii').replace(/\{project\}/g,name)),
				'js/grunt.js' : (fs.readFileSync(__dirname+'/templates/vanilla/grunt.js', 'ascii').replace(/\{project\}/g,name)),
				'js/src/app.js': '$(function(){\n\n 	console.log("'+name+' init");\n\n});'
			}

		}
	}

}

exports.index = function () {

	var fs = require('fs');

	var Creed = fs.readFileSync(__dirname+'/templates/vanilla/index.html', 'ascii');
  	return Creed;
  	
};