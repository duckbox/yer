
"user strict";

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

    if( _OS === 'Darwin' ) {

      reWrite({ file : system.hosts, content : HOSTS.replace(/{vh}/, name), name : name, match : name });
      reWrite({ file : system.vhosts, content : VIRTUAL_HOST.replace(/{vh}/, name).replace(/{vp}/, working_path), name : name, match : 'ServerName ' + name });

      exec("sudo httpd -k restart", function (error, stdout, stderr) {

        hostComplete( name );

      });

    } else {

      reWrite({ file : system.hosts, content : HOSTS.replace(/{vh}/, name), name : name, match : name });
      fs.writeFileSync(system.vhosts+'/'+name, VIRTUAL_HOST.replace(/{vh}/, name).replace(/{vp}/, working_path));

      console.log( clc.bright.yellow('Building..') );
      exec("cd "+system.enabled+" && sudo a2ensite "+name+" && sudo service apache2 restart", function (error, stdout, stderr) {

        hostComplete( name );

      });

    }
    

  });

program.parse(process.argv)




