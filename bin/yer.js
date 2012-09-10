
"use strict";

var program = require('commander'),
  clc = require('cli-color'),
  fs = require('fs'),
  sys = require('util'),
  exec = require('child_process').exec,
  os = require('os'),

  /*
    Short hand color functions
  */
  error = clc.red.bold,
  valid = clc.bright.green,
  label = clc.bright.red;


var creed = require('./../assets/creedface');

program.command('creedface')
  .description('creeding the face')
  .action(function( name ){
console.log( valid(creed.face()) );

});



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
  
  var data = fs.readFileSync(args.file, 'ascii');
      
  var pattern = new RegExp(args.match);

  if( pattern.test( data ) ) {
    console.log( valid('Sake.. ') + clc.bright.red(args.name) + ' exists in ' + clc(args.file) );
    process.exit();
  } 

  try {

    fs.writeFileSync( args.file, data+'\n'+args.content );
    console.log( valid('YEEEOOO!!.. ') + 'Added ' + clc.red(args.name) + ' to ' + clc(args.file) );

  } catch( err ) {

    console.log( error('FFS! - use sudo!') );
    process.exit();

  }

},

hostComplete = function( name ) {
  console.log( valid('YEEEOOO!!.. all done. ')+label(' @ http://'+name+'/') );
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

    switch( _OS ) {

      case 'Darwin' :

        reWrite({ file : system.hosts, content : HOSTS.replace(/{vh}/, name), name : name, match : name });
        reWrite({ file : system.vhosts, content : VIRTUAL_HOST.replace(/{vh}/, name).replace(/{vp}/, working_path), name : name, match : 'ServerName ' + name });

        exec("sudo httpd -k restart && open http://"+name+"/", function (error, stdout, stderr) {

          hostComplete( name );

        });

      break;
      case 'Linux' :

        reWrite({ file : system.hosts, content : HOSTS.replace(/{vh}/, name), name : name, match : name });
        fs.writeFileSync(system.vhosts+'/'+name, VIRTUAL_HOST.replace(/{vh}/, name).replace(/{vp}/, working_path));

        console.log( clc.bright.yellow('Building..') );
        exec("cd "+system.enabled+" && sudo a2ensite "+name+" && sudo service apache2 restart && x-www-browser http://"+name+"/", function (error, stdout, stderr) {

          hostComplete( name );

        });

      case 'Windows_NT' :
        console.log( error('Yer shitty OS is not supported') );
      break;
      default :
        console.log( label('Luv, I have no idea what OS this is') );
      break;

    }
    

  });

program.parse(process.argv)




