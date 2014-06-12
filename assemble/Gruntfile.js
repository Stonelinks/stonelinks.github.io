'use strict';

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('assemble');

  var BG_IMAGE_PATH = 'dist/assets/img/backgrounds/*.{png,jpg}';

  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },

    watch: {

      assemble: {
        files: ['<%= config.src %>/{data,templates}/**/*.{md,hbs,yml,underscore}'],
        tasks: ['assemble']
      },

      less: {
        files: ['<%= config.dist %>/assets/less/**/*.less'],
        tasks: ['less']
      },

      livereload: {

        options: {
          livereload: '<%= connect.options.livereload %>'
        },

        files: [
          '<%= config.dist %>/**/*.html',
          '<%= config.dist %>/assets/**/*.css',
          '<%= config.dist %>/assets/**/*.js',
          '<%= config.dist %>/assets/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {

      options: {
        port: 9000,
        livereload: 28231,
        hostname: '0.0.0.0'
      },

      livereload: {
        options: {
          // open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      },

      throttledLivereload: {
        options: {
          // open: 'http://<%= connect.options.hostname %>:<%= connect.options.port + 1 %>',
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    throttle: {
      default: {
        remote_port: '<%= connect.options.port %>',
        local_port: '<%= connect.options.port + 1 %>',
        local_host: '<%= connect.options.hostname %>',
        upstream: 10 * 1024,
        downstream: 100 * 1024
      }
    },

    assemble: {
      options: {
        flatten: true,
        assets: '<%= config.dist %>/assets',
        layoutdir: '<%= config.src %>/templates/layouts',
        layout: 'default.hbs',
        data: '<%= config.src %>/data/*.{json,yml}',
        partials: '<%= config.src %>/templates/partials/*.hbs',

        BG_IMAGES: grunt.file.expand(BG_IMAGE_PATH),

        helpers: ['handlebars-helper-compose'],
        compose: {
          compare: function(a, b) {
            return a.data.date >= b.data.date ? -1 : 1;
          }
        }
      },

      pages: {
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      },

      posts: {
        options: {
          layout: 'post.hbs'
        },
        files: {
          '<%= config.dist %>/posts/': ['<%= config.src %>/templates/posts/*.hbs']
        }
      }
    },

    less: {

      main: {
        files: {
          '<%= config.dist %>/assets/css/main.css': '<%= config.dist %>/assets/less/main.less'
        }
      }
    },

    // before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml}'],

    'gh-pages': {
      options: {
        base: 'dist',
        branch: 'master'
      },
      src: ['**', '.*']
    }
  });

  grunt.registerTask('build', [
    'clean',
    'assemble',
    'less'
  ]);

  grunt.registerTask('publish', [
    'build',
    'gh-pages'
  ]);

  grunt.registerTask('server', [
    'build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('server-throttle', [
    'build',
    'connect:throttledLivereload',
    'throttle',
    'watch'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
