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