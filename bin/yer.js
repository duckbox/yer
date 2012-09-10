
"user strict";

var program = require('commander'),
	clc = require('cli-color');

  var sys = require('sys');
var exec = require('child_process').exec;


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

program.command('os').action(function(){

  console.log( os.type() );

});


var working_path = process.cwd();



var VIRTUAL_HOST = 
'<VirtualHost *:80>\n'+
'   DocumentRoot "{vp}" \n'+
'   ServerName {vh}\n'+
'</VirtualHost>';

var HOSTS = '127.0.0.1 {vh}';

var reWrite = function( args ) {
  fs.readFile(args.file, 'ascii', function(err,data){
      
      var pattern = new RegExp(args.name);

      if( pattern.test( data ) ) {
        console.log('AYE');
      } else {
        console.log('NAY!');
      }


      /*if( !err ) {

        fs.writeFile(args.file, args.content+data, function(err){

          if(err) {
            console.log(error('FFS! - use sudo!'));
          } else {
            console.log(args.content);
          }

        });

      }*/

    });
}



/*
var request = require('request');
request('https://raw.github.com/necolas/normalize.css/master/normalize.css', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    //console.log(body); // Print the google web page.
    fs.writeFile("css2/norm2.css", body, null);
  }
});*/

program.command('host [name] ]')
  .description('add a vhost based for the project you are in')
  .action(function( name ){

    name = name || (working_path.substring(working_path.lastIndexOf("/")+1, working_path.length));

    //reWrite({ file : '/etc/hosts', content : HOSTS.replace(/{vh}/, name) });
    //

    console.log( name );

    //reWrite({ file : '/etc/apache2/extra/httpd-vhosts.conf', content : VIRTUAL_HOST.replace(/{vh}/, name).replace(/{vp}/, working_path), name : name });

    //console.log( HOSTS.replace(/{vh}/, name) );
    //console.log( VIRTUAL_HOST.replace(/{vh}/, 'foo').replace(/{vp}/, working_path) );

    

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


