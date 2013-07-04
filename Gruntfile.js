module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      common: {
        files: [
          {expand: true, cwd: 'assets/js/', src: ['**'], dest: 'public/js/'}
        ]
      }
    },
    less: {
      development: {
        options: {},
        files: {
          "public/design/css/master.css": "assets/less/master.less"
        }
      },
      production: {
        options: {
          yuicompress: true,
          ieCompat: false
        },
        files: {
          "public/design/css/master.css": "assets/less/master.less"
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      }
    },
    jshint: {
      // define the files to lint
      files: ['gruntfile.js', 'assets/js/main.js'],
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
      before: ["tmp", "public/js", "public/design/css"],
      after: ["tmp"]
    },
    requirejs: {
      productionOneFile: {
        options: {
          baseUrl: "assets/js",
          mainConfigFile: 'assets/js/main.js',
          optimize: "none",/*uglify2*/
          optimizeCss: "none",
          preserveLicenseComments: true,
          out: "public/js/main.js",
          name: "main",
          keepBuildDir: true
        }
      },
      development: {
        options: {
          appDir: "assets/js/",
          baseUrl: "./",
          mainConfigFile: 'assets/js/main.js',
          dir: "public/js",
          optimize: "none",
          preserveLicenseComments: true,
          keepBuildDir: true
        }
      },
      production: {
        options: {
          appDir: "assets/js/",
          baseUrl: "./",
          mainConfigFile: 'assets/js/main.js',
          dir: "public/js",
          optimize: "uglify2",
          keepBuildDir: false
        }
      }
    },
    watch: {
      scripts: {
        files: ['assets/js/**'],
        tasks: ['requirejs:development'],
        options: {
          nospawn: true
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
 
  grunt.registerTask('dev', [
    'jshint',
    'clean:before',
    'less:development',
    'requirejs:development',
    'clean:after'
  ]);

  grunt.registerTask('prod', [
    'jshint',
    'clean:before',
    'less:production',
    'requirejs:production',
    'clean:after'
  ]);

  // Register the default tasks
  grunt.registerTask('default', ['jshint']);

};
