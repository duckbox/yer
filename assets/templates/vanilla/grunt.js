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
            src : <%= files %>,
            dest : '<%= project %>.min.js'
        }
    },
    min : {
        dist : {
            src : '<config:concat.dist.dest>',
            dest : '<%= project %>.min.js'
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


/*var re = /<script src=\"\b[^>]*>([\s\S]*?)\"><\/script>/gm;

var match;
while (match = re.exec('<script src="js/src/app.js"></script>')) {
  // full match is in match[0], whereas captured groups are in ...[1], ...[2], etc.
  console.log(match[1]);
}*/