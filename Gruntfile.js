module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'components/bootstrap/', src: ['img/*'], dest: 'public/js/vendor/bootstrap/', filter: 'isFile'}, // includes files in path
          {expand: true, cwd: 'components/jquery/', src: ['jquery.js'], dest: 'public/js/vendor/'},/*, filter: 'isFile'*/
          {expand: true, cwd: 'components/underscore/', src: ['underscore.js'], dest: 'public/js/vendor/'},/*, filter: 'isFile'*/
          {expand: true, cwd: 'components/json2/', src: ['json2.js'], dest: 'public/js/vendor/'},/*, filter: 'isFile'*/
          {expand: true, cwd: 'components/backbone/', src: ['backbone.js'], dest: 'public/js/vendor/'},/*, filter: 'isFile'*/
          {expand: true, cwd: 'components/marionette/lib/', src: ['backbone.marionette.js'], dest: 'public/js/vendor/'},/*, filter: 'isFile'*/
          {expand: true, cwd: 'components/requirejs/', src: ['require.js'], dest: 'public/js/vendor/'},/*, filter: 'isFile'*/
          {expand: true, cwd: 'components/requirejs-tpl/', src: ['tpl.js'], dest: 'public/js/vendor/'}/*, filter: 'isFile'*/
          //{src: ['path/**'], dest: 'dest/'}, // includes files in path and its subdirs
          //{expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'}, // makes all src relative to cwd
          //{expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'} // flattens results to a single level
        ]
      }
    },
    less: {
      development: {
        options: {
          paths: ["components"]
        },
        files: {
          "public/js/vendor/bootstrap/css/bootstrap.min.css": "components/bootstrap/less/bootstrap.less",
          "public/js/vendor/bootstrap/css/bootstrap-responsive.min.css": "components/bootstrap/less/responsive.less",
          "public/design/css/master.min.css": "assets/less/master.less"
        }
      },
      production: {
        options: {
          paths: ["components"],
          yuicompress: true
        },
        files: {
          "public/js/vendor/bootstrap/css/bootstrap.min.css": "components/bootstrap/less/bootstrap.less",
          "public/js/vendor/bootstrap/css/bootstrap-responsive.min.css": "components/bootstrap/less/responsive.less"
        }
      }
    },
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // bootstrap{
        //   // the files to concatenate
        //   src: ['src/js/bootstrap/*.js'],
        //   // the location of the resulting JS file
        //   dest: 'build/js/bootstrap.js'
        // },
        // jquery{
        //   // the files to concatenate
        //   src: ['src/js/jquery.js'],
        //   // the location of the resulting JS file
        //   dest: 'build/js/jquery.js'
        // }
        files: {
          'public/js/vendor/bootstrap/bootstrap.js': ['components/bootstrap/js/*.js']
        }
        
      }
    },
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/js/vendor/bootstrap/bootstrap.min.js': ['public/js/vendor/bootstrap/bootstrap.js'],
          'public/js/require.min.js': ['public/js/vendor/require.js']
        }
      }
    },
    jshint: {
      // define the files to lint
      files: ['gruntfile.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
      
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'concat', 'uglify']
    }
  });
 
  // Load libs
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
 
  // Register the default tasks
  grunt.registerTask('default', ['jshint']);

  //
  grunt.registerTask('dev', ['jshint', 'copy', 'less', 'concat', 'uglify']);

  // Register building task
  grunt.registerTask('build', ['jshint', 'copy', 'less', 'concat', 'uglify']);
 
};
