'use strict';

module.exports = function(grunt) {
  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);
  // require('load-grunt-tasks')(grunt);
  // require('time-grunt')(grunt);

  grunt.initConfig({

    config: grunt.file.readJSON('./app.config.json'),

    clean: {
      public: ['public'],
      less: ['<%= concat.less.dest %>'],
    },

    // concat all state less files to the end of index.less
    concat: {
      less: {
        src: ['<%= config.index.less %>', '<%= config.app.less %>'],
        dest: 'client/bundle.less'
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      watch: {
        tasks: [
          'connect:server',
          'build',
          'shell:startWebdriver',
          'watch:build',
          'watch:livereload',
          'watch:protractor',
          'karma:watch'
        ]
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          open: true,
          base: '<%= config.dist %>',
          keepalive: true
        }
      }
    },

    // Insert angular templates into index.html
    htmlbuild: {
      templates: {
        src: '<%= config.index.html %>',
        dest: '<%= config.dist %>',
        options: {
          sections: {
            templates: '<%= config.app.html %>',
          },
        }
      }
    },

    jsbeautifier: {
      verify: {
        src: [
          'client/src/**/*.js',
          'index.js',
          'Gruntfile.js'
        ],
        options: {
          mode: 'VERIFY_ONLY',
          js: {
            indentSize: 2
          }
        }
      },
      all: {
        src: [
          'client/src/**/*.js',
          'index.js',
          'Gruntfile.js'
        ],
        options: {
          js: {
            indentSize: 2
          }
        }
      }
    },


    // jshint: {
    //   options: {
    //     jshintrc: true,
    //     reporter: require('jshint-stylish')
    //   },
    //   server: {
    //     src: ['*.js', 'lib/**/*.js']
    //   }
    // },

    karma: {
      options: {
        configFile: 'test/karma.conf.js',
      },
      browser: {
        autoWatch: true,
        singleRun: false,
        browsers: ['Chrome', 'Firefox']
      },
      continuous: {
        singleRun: true,
      },
      coverage: {
        reporters: ['coverage'],
      },
      watch: {
        autoWatch: true,
        singleRun: false
      },
      debug: {
        autoWatch: true,
        singleRun: false,
        browsers: ['Chrome']
      }
    },

    less: {
      dev: {
        files: {
          "<%= config.dist %>/bundle.css": "<%= concat.less.dest %>"
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'dot',
          require: ['./test/server/src/bootstrap']
        },
        src: ['test/server/unit/**/*.js']
      }
    },

    protractor: {
      all: {
        options: {
          configFile: "test/protractor.conf.js", // Target-specific config file
          debug: false,
          args: {} // Target-specific arguments
        }
      },
    },

    // Follow instructions https://github.com/angular/protractor to install selenium web driver
    // starts and stops webdriver
    protractor_webdriver: {
      main: {
        options: {
          command: 'webdriver-manager start',
        },
      },
    },

    shell: {
      startWebdriver: {
        command: 'webdriver-manager start'
      }
    },

    uglify: {
      dev: {
        options: {
          mangle: false,
          compress: false,
          beautify: true,
          sourceMap: true,
          sourceMapIncludeSources: true
        },
        files: {
          '<%= config.dist %>/bundle.js': ['<%= config.vendor %>', '<%= config.index.js %>', '<%= config.app.js %>']
        }
      }
    },

    // Reduce logging clutter in the terminal
    verbosity: {
      build: {
        options: {
          mode: 'dot'
        },
        tasks: [
          'jsbeautifier',
          'clean:',
          // templates
          'htmlbuild',
          // javascript
          'uglify',
          // less
          'concat',
          'less',
          'clean'
        ]
      }
    },

    watch: {
      build: {
        files: [
          '<%= config.index.html %>',
          '<%= config.index.js %>',
          '<%= config.index.less %>',
          '<%= config.app.html %>',
          '<%= config.app.js %>',
          '<%= config.app.less %>',
          '<%= config.test.unit %>',
          'Gruntfile.js'
        ],
        tasks: ['build'],
      },
      protractor: {
        files: [
          '<%= config.index.html %>',
          '<%= config.index.js %>',
          '<%= config.app.html %>',
          '<%= config.app.js %>',
          '<%= config.test.e2e %>'
        ],
        tasks: ['protractor'],
      },
      livereload: {
        options: {
          livereload: true
        },
        files: ['<%= config.dist %>/**'],
      }
    }
  });

  grunt.registerTask('default', [
    'concurrent:watch'
  ]);

  grunt.registerTask('unit', [
    'karma:continuous'
  ]);

  grunt.registerTask('e2e', [
    'protractor_webdriver',
    'protractor'
  ]);

  grunt.registerTask('build', [
    'verbosity',
    'jsbeautifier:all',
    'clean:public',
    // templates
    'htmlbuild:templates',
    // javascript
    'uglify:dev',
    // less
    'concat:less',
    'less:dev',
    'clean:less'
  ]);

  grunt.registerTask('build:prod', [
    'jshint',
    'clean:public',
    'copy:public',
    'requirejs:prod',
    'processhtml'
  ]);
};
