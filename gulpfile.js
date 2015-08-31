/**
 * Created by ld on 8/30/15.
 */

var gulp = require('gulp');
var webserver = require('gulp-webserver');
var clean = require('gulp-clean');
var less = require('gulp-less');
var wintersmith = require('wintersmith')('./config.json');

var path = {
    site: [
        './contents/*.{md,json}',
        './contents/posts/**/*',
        './contents/projects/**/*'
    ],
    vendor: './contents/vendor/**/*',
    style: './contents/style/**/*.less',
    js: './contents/js/**/*.js',
    images: './contents/images/**/*.*'
};

gulp.task('js', function () {
    return gulp.src(path.js)
        .pipe(gulp.dest('./build/js'));
});

gulp.task('images', function () {
    return gulp.src(path.images)
        .pipe(gulp.dest('./build/images'));
});

gulp.task('vendor', function () {
    return gulp.src(path.vendor)
        .pipe(gulp.dest('./build/vendor'));
});

gulp.task('site', function (done) {
    wintersmith.build(done);
});

gulp.task('style', function () {
    return gulp.src(path.style)
        .pipe(less({
            paths: ['./contents/']
        }))
        .pipe(gulp.dest('./build/style'));
});

gulp.task('webserver', function () {
    return gulp.src('./build')
        .pipe(webserver({
            host: '0.0.0.0',
            livereload: true,
            path: 'build'
            //directoryListing: true
        }));
});

gulp.task('clean', function () {
    return gulp.src('./build')
        .pipe(clean());
});

gulp.task('build', ['js', 'style', 'site', 'images', 'vendor']);

gulp.task('watch', ['build'], function () {
    gulp.watch(path.site, ['site']);
    gulp.watch(path.js, ['js']);
    gulp.watch(path.style, ['style']);
    gulp.watch(path.images, ['images']);
    gulp.watch(path.vendor, ['vendor']);
});

gulp.task('develop', ['watch', 'webserver']);

gulp.task('default', ['build']);