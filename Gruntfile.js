'use strict';

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('assemble');

  var BG_IMAGE_PATH = 'dist/assets/img/backgrounds/*.{png,jpg}'

  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },

    watch: {

      assemble: {
        files: ['<%= config.src %>/{data,templates}/**/*.{md,hbs,yml}'],
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
        livereload: 35729,
        hostname: '0.0.0.0'
      },

      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
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

      blog: {
        options: {
          layout: 'post.hbs'
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/posts/*.md']
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
      src: ['**']
    },
    
    imagemin: {
      bg_images: {
        options: {
          optimizationLevel: 5
        },
        files: [{
          expand: true,
          src: [BG_IMAGE_PATH]
        }]
      }
    }
  });
  
  grunt.registerTask('build', [
    'clean',
    'assemble',
    'less',
    'imagemin'
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

  grunt.registerTask('default', [
    'build'
  ]);
};
