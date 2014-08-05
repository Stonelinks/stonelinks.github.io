'use strict';

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    config: {
      src: 'contents',
      templates: 'templates',
      dist: 'build'
    },

    wintersmith_config: grunt.file.readJSON('config.json'),

    wintersmith: {

      build: {},

      preview: {
        options: {
          action: 'preview'
        }
      }
    },

    watch: {

      less: {
        files: ['<%= config.src %>/less/**/*.less'],
        tasks: ['less']
      }
    },

    throttle: {

      default: {
        remote_port: '<%= wintersmith_config.port %>',
        local_port: '<%= wintersmith_config.port + 1 %>',
        local_host: '0.0.0.0',
        upstream: 10 * 1024,
        downstream: 100 * 1024
      }
    },

    clean: ['<%= config.dist %>'],

    less: {

      main: {
        files: {
          '<%= config.src %>/css/main.css': '<%= config.src %>/less/main.less'
        }
      }
    },

    concurrent: {
      server: ['wintersmith:preview', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },

    copy: {
      nojekyll: {
        src: '.nojekyll',
        dest: '<%= config.dist %>/'
      }
    },

    'link-checker': {
      dev: {
        site: 'localhost',
        options: {
          noFragment: true,
          initialPort: '<%= wintersmith_config.port + 2 %>'
        }
      }
    },

    connect: {
      test: {
        options: {
          port: '<%= wintersmith_config.port + 2 %>',
          base: 'build'
        }
      }
    },

    'gh-pages': {
      options: {
        base: '<%= config.dist %>',
        branch: 'master'
      },
      src: ['**', '.*']
    },

    rsync: {
      options: {
        args: ['--verbose'],
        recursive: true
      },
      dist: {
        options: {
          src: '<%= config.dist %>/',
          dest: 'www-data@stonelinks.org:/var/www',
          ssh: true,
          delete: true
        }
      }
    }
  });

  grunt.registerTask('pre', [
    'clean',
    'less'
  ]);

  grunt.registerTask('build', [
    'pre',
    'wintersmith:build',
    'copy:nojekyll'
  ]);

  grunt.registerTask('publish', [
    'build',
    'rsync',
    'gh-pages'
  ]);

  grunt.registerTask('server', [
    'pre',
    'concurrent:server'
  ]);

  grunt.registerTask('server-throttle', [
    'throttle',
    'server'
  ]);

  grunt.registerTask('test', [
    'build',
    'connect:test',
    'link-checker'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
