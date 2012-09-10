
"user strict";

var program = require('commander'),
	clc = require('cli-color');

  var sys = require('util');
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
var _OS = os.type();

program.command('os').action(function(){

  console.log( os.type() );

});

var OS = {
  'Darwin' : {
    hosts : '/etc/hosts',
    vhosts : '/etc/apache2/extra/httpd-vhosts.conf'
  },
  'Linux' : {
    hosts : '/etc/hosts',
    vhosts : '/etc/apache2/sites-available',
    enabled : '/etc/apache2/sites-enabled'
  }
}

var system = OS[_OS]; 


var working_path = process.cwd();



var VIRTUAL_HOST = 
'<VirtualHost *:80>\n'+
'   DocumentRoot "{vp}" \n'+
'   ServerName {vh}\n'+
'</VirtualHost>';

var HOSTS = '127.0.0.1 {vh}';

var reWrite = function( args ) {
  var data = fs.readFileSync(args.file, 'ascii' /*, function(err,data){*/ );
      
      var pattern = new RegExp(args.match);

      if( pattern.test( data ) ) {
        console.log( clc.bright.green('Sake.. ') + clc.bright.red(args.name) + ' exists in ' + clc.bright(args.file) );
        process.exit();
      } 

      //if( !err ) {

        try {
          fs.writeFileSync(args.file, data+'\n'+args.content/*, function(err){*/);
          console.log( clc.bright.green('YEEEOOO!!.. ') + 'Added ' + clc.red(args.name) + ' to ' + clc.bright(args.file) );
        
        } catch( err ) {

          console.log( error('FFS! - use sudo!') );
          process.exit();

        }
         // } else {
         // }

     //   });

     // }

   // });
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
  .description('add a vhost for a project')
  .action(function( name ){

    name = name || (working_path.substring(working_path.lastIndexOf("/")+1, working_path.length ));

    if( _OS === 'Darwin' ) {

      reWrite({ file : system.hosts, content : HOSTS.replace(/{vh}/, name), name : name, match : name });
      reWrite({ file : system.vhosts, content : VIRTUAL_HOST.replace(/{vh}/, name).replace(/{vp}/, working_path), name : name, match : 'ServerName ' + name });

    } else {

      reWrite({ file : system.hosts, content : HOSTS.replace(/{vh}/, name), name : name, match : name });
      fs.writeFileSync(system.vhosts+'/'+name, VIRTUAL_HOST.replace(/{vh}/, name).replace(/{vp}/, working_path));

          console.log( clc.bright.yellow('Building..') );
          exec("cd "+system.enabled+" && sudo a2ensite "+name+" && sudo service apache2 restart", function (error, stdout, stderr) {

            console.log( clc.bright.green('YEEEOOO!!.. all done. ')+clc.bright.red(' @ http:/'+name+'/') );

          });

    }


    exec("sudo httpd -k restart", function (error, stdout, stderr) {

      console.log( clc.bright.green('YEEEOOO!!.. all done. ')+clc.bright.red(' @ http:/'+name+'/') );

    });

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


