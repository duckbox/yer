
"user strict";

var program = require('commander'),
	clc = require('cli-color');


var error = clc.red.bold;

var fs = require('fs');
/*program
  .version('0.0.1')
  .option('-p, --peppers [env]', 'Add peppers', parseFloat)
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);

//console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers %j', env);
if (program.pineapple) console.log('  - pineappe');
if (program.bbq) console.log('  - bbq');
//console.log('  - %s cheese', program.cheese);*/

/*fs.readdir('js/src',function( err, files ){
	
	files.forEach(function( file ){

		console.log( clc.green.underline(file) );

	});

});*/

var os = require('os');

console.log( error( os.type() ) );

/*
fs.readFile('/etc/hosts', 'ascii', function(err,data){

  console.log(data);

});*/


/*
var request = require('request');
request('https://raw.github.com/necolas/normalize.css/master/normalize.css', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    //console.log(body); // Print the google web page.
    fs.writeFile("css2/norm2.css", body, null);
  }
});*/

program
  .command('setup [env] [foo]')
  .description('run setup commands for all envs')
  .action(function(env, foo){
    env = env || 'all';
    console.log('setup for %s , %s env(s)', env, foo);
  });

/*program.prompt('name: ', function(name){
  console.log('hi %s', name);
  //process.exit();
});*/

program.parse(process.argv)

/*console.log( error('FFS!') );

var prin = { "text" : 'foo' };

fs.writeFile("boomie-bacon.json", JSON.stringify(prin), function(err) {
    if(err) {
        console.log(err);
    } else {
        //console.log("The file was saved!");
    }
}); */



// http://nodejs.org/api.html#_child_processes
/*var sys = require('sys')
var exec = require('child_process').exec;
var child;

// executes `pwd`
child = exec("npm install", function (error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});*/