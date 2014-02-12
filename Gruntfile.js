module.exports = function(grunt) {
'use strict';

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  var SITE_DIR = '_site'

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jekyll: {
      website: {}
    },

    rsync: {

      options: {
        recursive: true
      },

      assets: {
        options: {
          src: [
            'img',
            'css',
            'js'
          ],
          dest: SITE_DIR
        }
      },

      bower_components: {
        options: {
          src: [
            'bower_components'
          ],
          dest: SITE_DIR
        }
      },

      deploy: {
        options: {
          src: [SITE_DIR],
          dest: '/var/www/www/mujin.co.jp',
          host: 'www-data@mujin.co.jp',
          syncDest: true
        }
      }
    },

    less: {

      dev: {
        files: {
          'css/main.css': 'less/main.less'
        }
      },

      production: {
        options: {
          cleancss: true
        },
        files: {
          'css/main.min.css': 'less/main.less'
        }
      }
    },

    clean: [SITE_DIR],

    watch: {

      options: {
        livereload: 12345
      },

      // build the website if anything changes
      website: {
        files: [
          '**/*.yml',
          '**/*.md',
          '**/*.html',

          // exclude a bunch of crap that should not be watched
          '!**/.git/**',
          '!**/node_modules/**',
          '!**/bower_components/**',
          '!**/' + SITE_DIR + '/**'
        ],
        tasks: ['jekyll']
      },

      assets: {
        files: [
          'img/**/*',
          'js/**/*',
          'css/**/*'
        ],
        tasks: ['rsync:assets']
      },

      less: {
        files: ['less/**/*'],
        tasks: ['less']
      },

      bower_components: {
        files: [
          'bower_components/**/*',
        ],
        tasks: ['rsync:bower_components']
      }
    },

    // testing server
    connect: {

      options: {
        hostname: '*',
        port: 1234,
        livereload: 12345,
        base: SITE_DIR
      },

      testserver: {}
    }
  });

  grunt.registerTask('website', function() {

    grunt.task.run([
      'clean',
      'less',
      'jekyll'
    ]);
  });

  grunt.registerTask('gaze', function() {

    grunt.task.run([
      'connect',
      'website',
      'watch'
    ]);
  });

  grunt.registerTask('default', function() {

    grunt.option('force', true);

    grunt.task.run([
      'website'
    ]);
  });

  grunt.registerTask('deploy', function() {

    grunt.task.run([
      'website',
      'rsync:deploy'
    ]);
  });

  // gaze, to be used along with server
  grunt.registerTask('lint', [
    'exec:fixjsstyle'
  ]);
};
