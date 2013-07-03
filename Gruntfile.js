module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      common: {
        files: [
          {expand: true, cwd: 'components/bootstrap/', src: ['img/*'], dest: 'public/design/', filter: 'isFile'}, // includes files in path
          {expand: true, cwd: 'components/requirejs/', src: ['require.js'], dest: 'public/js/vendor/'},/*, filter: 'isFile'*/
          {expand: true, cwd: 'components/requirejs-tpl/', src: ['tpl.js'], dest: 'public/js/vendor/'},

          {expand: true, cwd: 'components/jquery/', src: ['jquery.js'], dest: 'assets/js/vendor/'},
          {expand: true, cwd: 'components/underscore/', src: ['underscore.js'], dest: 'assets/js/vendor/'},
          {expand: true, cwd: 'components/json2/', src: ['json2.js'], dest: 'assets/js/vendor/'},
          {expand: true, cwd: 'components/backbone/', src: ['backbone.js'], dest: 'assets/js/vendor/'},
          {expand: true, cwd: 'components/marionette/lib/', src: ['backbone.marionette.js'], dest: 'assets/js/vendor/'}
          //{src: ['path/**'], dest: 'dest/'}, // includes files in path and its subdirs
          //{expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'}, // makes all src relative to cwd
          //{expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'} // flattens results to a single level
        ]
      },
      production: {
        files: [
          {expand: true, cwd: 'assets/js/', src: ['project/**'], dest: 'public/js/'}
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
        dest: 'assets/js/vendor/bootstrap.js'
      },
      css: {
        options: {
          separator: ''
        },
        src: ['tmp/*.css'],
        dest: 'public/design/css/master.css'
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
      before: ["tmp", "public/js", "public/design/css", "assets/js/vendor"],
      after: ["tmp"]
    },
    requirejs: {
      production: {
        options: {
          baseUrl: "assets/js/project",
          mainConfigFile: 'assets/js/main.js',
          optimize: "uglify2",
          optimizeCss: "none",
          preserveLicenseComments: false,
          out: "public/js/main.js",
          name: "../main",
          keepBuildDir: false
        }
      },
      development: {
        options: {
          appDir: "assets/js/",
          baseUrl: "./",
          mainConfigFile: 'assets/js/main.js',
          dir: "public/js",
          optimize: "none",
          optimizeCss: "none",
          preserveLicenseComments: true,
          keepBuildDir: true
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
  grunt.loadNpmTasks('grunt-contrib-requirejs');
 
  // Register the default tasks
  grunt.registerTask('default', ['jshint']);

  //
  grunt.registerTask('dev', [
    'jshint',
    'clean:before',
    'copy:common',
    'less:development',
    'concat:bootstrap',
    'concat:css',
    'requirejs:development',
    'clean:after'
  ]);

  // Register building task
  grunt.registerTask('prod', [
    'jshint',
    'clean:before',
    'copy:common',
    'less:production',
    'concat:bootstrap',
    'concat:css',
    'requirejs:production',
    'copy:production',
    'clean:after'
  ]);

};
