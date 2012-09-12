/*global module:false*/
/*global grunt:false*/
module.exports = function(grunt) {

  // Project configuration.

  grunt.initConfig({
    pkg: {
        title: "<%= project %>"
    },
    sass: {
        dist: {
            src: ['../css/src/norm.css','../css/src/layout.scss'],
            dest: '../css/layout.css'
        }
    },
    concat : {
        dist : {
            src : ['lib/jquery.min.js', 'src/app.js'],
            dest : '{project}.min.js'
        }
    },
    min : {
        dist : {
            src : '<config:concat.dist.dest>',
            dest : '{project}.min.js'
        }
    },
    cssmin: {
        dest: {
            src: '<sass:dist.dest>',
            dest: '../css/layout.css'
        }
    }
  });

  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-sass');

  // Default task.
  grunt.registerTask('default','sass cssmin');
  grunt.registerTask('build','sass cssmin concat min');

};
