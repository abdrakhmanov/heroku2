module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'components/bootstrap/', src: ['img/*'], dest: 'public/design/', filter: 'isFile'}, // includes files in path
          {expand: true, cwd: 'components/jquery/', src: ['jquery.js'], dest: 'public/js/vendor/'},/*, filter: 'isFile'*/
          {expand: true, cwd: 'components/underscore/', src: ['underscore.js'], dest: 'public/js/vendor/'},/*, filter: 'isFile'*/
          {expand: true, cwd: 'components/json2/', src: ['json2.js'], dest: 'public/js/vendor/'},/*, filter: 'isFile'*/
          {expand: true, cwd: 'components/backbone/', src: ['backbone.js'], dest: 'public/js/vendor/'},/*, filter: 'isFile'*/
          {expand: true, cwd: 'components/marionette/lib/', src: ['backbone.marionette.js'], dest: 'public/js/vendor/'},/*, filter: 'isFile'*/
          {expand: true, cwd: 'components/requirejs/', src: ['require.js'], dest: 'tmp/'},/*, filter: 'isFile'*/
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
          "tmp/1.bootstrap.css": "components/bootstrap/less/bootstrap.less",
          "tmp/2.bootstrap-responsive.css": "components/bootstrap/less/responsive.less",
          "tmp/3.master.css": "assets/less/master.less"
        }
      },
      production: {
        options: {
          paths: ["components"],
          yuicompress: true,
          ieCompat: false
        },
        files: {
          "tmp/1.bootstrap.css": "components/bootstrap/less/bootstrap.less",
          "tmp/2.bootstrap-responsive.css": "components/bootstrap/less/responsive.less",
          "tmp/3.master.css": "assets/less/master.less"
        }
      }
    },
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      bootstrap: {
        // the files to concatenate
        src: ['components/bootstrap/js/*.js'],
        // the location of the resulting JS file
        dest: 'tmp/bootstrap.js'
      },
      css: {
        options: {
          separator: ''
        },
        src: ['tmp/*.css'],
        dest: 'public/design/css/master.css'
      },
      rjs: {
        src: [
          'public/js/vendor/jquery.js',
          'public/js/vendor/underscore.js',
          'public/js/vendor/json2.js',
          'public/js/vendor/bootstrap.js',
          'public/js/vendor/backbone.js',
          'public/js/vendor/backbone.marionette.js',
          'public/js/vendor/tpl.js',
          'public/js/project/**.js',
          'public/js/main.js'
          ],
        dest: 'tmp/main.js'
      },

    },
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/js/vendor/bootstrap.js': ['tmp/bootstrap.js'],
          'public/js/vendor/require.js': ['tmp/require.js']
        }
      },
      rjs: {
        files: {
          'tmp/main.min.js' : 'tmp/main.js'
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
    clean: {
      before: ["tmp", "public/js/vendor", "public/design/css"],
      after: ["tmp"]
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "path/to/base",
          mainConfigFile: "path/to/config.js",
          out: "path/to/optimized.js"
        }
      }
    }
  });
 
  // Load libs
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
 
  // Register the default tasks
  grunt.registerTask('default', ['jshint']);

  //
  grunt.registerTask('dev', ['jshint', 'clean:before', 'copy', 'less:development', 'concat', 'uglify', 'clean:after']);

  // Register building task
  grunt.registerTask('prod', ['jshint', 'clean:before', 'copy', 'less:production', 'concat', 'uglify', 'clean:after']);

  grunt.registerTask('rjs', ['concat:rjs', 'uglify:rjs']);
 
};
