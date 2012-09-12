"use strict";

/*global console*/
/*global process*/
/*global require*/

/* modules */
var program = require('commander'),
  clc = require('cli-color'),
  //wrench = require('wrench'),
  request = require('request'),

  // Native
  fs = require('fs'),
  sys = require('util'),
  exec = require('child_process').exec,
  os = require('os'),

  // Local
  creed = require('./../assets/creedface'),

  /*
    Short hand color functions
  */
  error = clc.red.bold,
  valid = clc.bright.green,
  label = clc.bright.red,

  /*
    Assets
  */
  assets = {
    VIRTUAL_HOST :
      '<VirtualHost *:80>\n'+
      '   DocumentRoot "{vp}" \n'+
      '   ServerName {vh}\n'+
      '</VirtualHost>',

    HOSTS : '127.0.0.1 {vh}',
    working_path : process.cwd()
  },

  OS = {
    'Darwin' : {
      hosts : '/etc/hosts',
      vhosts : '/etc/apache2/extra/httpd-vhosts.conf'
    },
    'Linux' : {
      hosts : '/etc/hosts',
      vhosts : '/etc/apache2/sites-available',
      enabled : '/etc/apache2/sites-enabled'
    }
  },

  _OS = os.type(),

  system = OS[_OS],

  reWrite = function( args ) {
    
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

      console.log( clc.red('ಠ_ಠ ')+error('FFS! - use sudo!') );
      process.exit();

    }

  },

  hostComplete = function( name ) {
    console.log( valid('All done. ')+clc.bright.yellow(assets.working_path)+valid.bold(' => ')+label(' @ http://'+name+'/') );
  };

program.command('host [name] ]')
.description('add a vhost for a project, leave blank for taking the project folder as name')
.action(function( name ){

  name = name || (assets.working_path.substring(assets.working_path.lastIndexOf("/")+1, assets.working_path.length ));

  switch( _OS ) {

    case 'Darwin' :

      reWrite({ file : system.hosts, content : assets.HOSTS.replace(/\{vh\}/, name), name : name, match : name });
      reWrite({ file : system.vhosts, content : assets.VIRTUAL_HOST.replace(/\{vh\}/, name).replace(/\{vp\}/, assets.working_path), name : name, match : 'ServerName ' + name });

      console.log( clc.bright.yellow('Finishing..') );
      exec("sudo httpd -k restart && open http://"+name+"/", function (error, stdout, stderr) {

        hostComplete( name );

      });

    break;
    case 'Linux' :

      reWrite({ file : system.hosts, content : assets.HOSTS.replace(/\{vh\}/, name), name : name, match : name });
      fs.writeFileSync(system.vhosts+'/'+name, assets.VIRTUAL_HOST.replace(/\{vh\}/, name).replace(/\{vp\}/, assets.working_path));

      console.log( clc.bright.yellow('Finishing..') );
      exec("cd "+system.enabled+" && sudo a2ensite "+name+" && sudo service apache2 restart && x-www-browser http://"+name+"/", function (error, stdout, stderr) {

        hostComplete( name );

      });

    case 'Windows_NT' :
      console.log( error('Yer shitty OS is not supported for yer host') );
    break;
    default :
      console.log( label('Luv, I have no idea what OS this is') );
    break;

  }
  

});

program.command('project [name]')
  .description('Create a project')
  .action(function( name ){

    name = name || (assets.working_path.substring(assets.working_path.lastIndexOf("/")+1, assets.working_path.length ));

    console.log( clc.yellow('Starting') );

    request('https://raw.github.com/necolas/normalize.css/master/normalize.css', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        
        var files = creed.template('vanilla', { project : name });

        files.dirs.forEach(function( dir ){
          fs.mkdirSync(dir);
        });

        for( var file in files.files ){
          fs.writeFileSync(file, (files.files[file]) );
        };

        console.log( clc.yellow('Pulling yer resources and building..') );
        //fs.writeFileSync("css/src/norm.css", body);
        request('http://code.jquery.com/jquery-latest.min.js', function (error, response, body) {

          fs.writeFileSync('js/lib/jquery.min.js', body );
          console.log( clc.yellow('Done!') );
          console.log( label('Run ')+valid(' cd js && npm install -d && grunt')+label(' to get started') );

        });
      } else {
        console.log( clc.red('Could not fetch norm.css') );
      }
    });

});

program.command('creedface')
  .description('creeding the face')
  .action(function( name ){

    console.log( valid(creed.face()) );

});

program.command('steven')
  .description('STEVEN GTFO')
  .action(function( name ){

    console.log( valid(creed.steven()) );

});

program.command('reset')
  .description('')
  .action(function(){

    exec('sudo rm -rf css img js && rm index.html',null);

});

program.parse(process.argv);



