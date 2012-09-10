exports.face = function () {

	var fs = require('fs');

	var Creed = fs.readFileSync(__dirname+'/creed.txt', 'ascii');
  	return Creed;
};