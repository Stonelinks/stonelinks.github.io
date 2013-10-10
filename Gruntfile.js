'use strict';

module.exports = function(grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        jekyll: {
            website: {}
        },

        watch: {

            options: {
                livereload: 12345
            },

            // build the website if anything changes
            website: {
                files: [
                    '_config.yml',
                    'assets/**/*',
                    '_includes/**/*.html',
                    '_layouts/**/*.html',
                    'examples/**/*',
                    'bower_components/**/*',
                    '*.html'
                ],
                tasks: ['jekyll']
            }
        },

        // testing server
        connect: {

            options: {
                hostname: '*',
                port: 1234,
                livereload: 12345,
                base: '_site'
            },

            testserver: {}
        }

    });

    grunt.registerTask('website', function() {

        grunt.task.run([
            'jekyll',
            'connect',
            'watch'
        ]);
    });

    grunt.registerTask('build', function(target) {

    grunt.registerTask('default', function() {

        grunt.option('force', true);

        grunt.task.run([
            'website'
        ]);
    });
};
