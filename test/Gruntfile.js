'use strict';

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // var BG_IMAGE_PATH = 'dist/assets/img/backgrounds/*.{png,jpg}';

  grunt.initConfig({
    
    config: {
      src: 'contents',
      templates: 'templates',
      dist: 'build'
    },

    wintersmith: {
      
      build: {},
      
      preview: {
        options: {
          action: "preview"
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

    'gh-pages': {
      options: {
        base: '<%= config.dist %>',
        branch: 'master'
      },
      src: ['**', '.*']
    }
  });

  grunt.registerTask('pre', [
    'less'
  ]);
  
  grunt.registerTask('build', [
    'pre',
    'wintersmith:build'
  ]);

  grunt.registerTask('publish', [
    'build',
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

  grunt.registerTask('default', [
    'build'
  ]);
};