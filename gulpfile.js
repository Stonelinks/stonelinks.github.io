/**
 * Created by ld on 8/30/15.
 */

var gulp = require('gulp');
var webserver = require('gulp-webserver');
var clean = require('gulp-clean');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var wintersmith = require('wintersmith')('./config.json');
var rsync = require('gulp-rsync');
var ghPages = require('gulp-gh-pages');
var gulpSequence = require('gulp-sequence');

var path = {
    site: [
        './contents/*.{md,json}',
        './contents/posts/**/*',
        './contents/projects/**/*'
    ],
    node_modules: [
        './node_modules/jquery/**/*',
        './node_modules/underscore/**/*',
        './node_modules/bootstrap/**/*',
        './node_modules/imagesloaded/**/*',
        './node_modules/font-awesome/**/*',
        './node_modules/blueimp-gallery/**/*',
        './node_modules/blueimp-bootstrap-image-gallery/**/*',
        './node_modules/isotope/**/*',
        './node_modules/isotope-packery/**/*'
    ],
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

gulp.task('node_modules', function () {
    return gulp.src(path.node_modules, {base: './node_modules'})
        .pipe(gulp.dest('./build/node_modules/'));
});

gulp.task('nojekyll', function () {
    return gulp.src('.nojekyll')
        .pipe(gulp.dest('./build'));
});

gulp.task('site', function (done) {
    wintersmith.build(done);
});

gulp.task('style', function () {
    return gulp.src('./contents/style/main.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: ['./contents/']
        }))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./build/style'));
});

gulp.task('webserver', function () {
    return gulp.src('./build')
        .pipe(webserver({
            host: '0.0.0.0',
            livereload: true,
            path: './build'
        }));
});

gulp.task('clean', function () {
    return gulp.src('./build')
        .pipe(clean());
});

gulp.task('build', gulpSequence('clean', ['nojekyll', 'js', 'style', 'site', 'images', 'node_modules']));

gulp.task('watch', ['build'], function () {
    gulp.watch(path.site, ['site']);
    gulp.watch(path.js, ['js']);
    gulp.watch(path.style, ['style']);
    gulp.watch(path.images, ['images']);
    gulp.watch(path.node_modules, ['node_modules']);
});

gulp.task('gh-pages', function () {
    return gulp.src([
        './build/**/*',
        './build/.nojekyll'
    ]).pipe(ghPages({
        branch: 'master'
    }));
});

gulp.task('rsync', function () {
    return gulp.src('build')
        .pipe(rsync({
            root: 'build',
            username: 'www-data',
            hostname: 'stonelinks.org',
            clean: true,
            recursive: true,
            destination: '/var/www'
        }));
});

gulp.task('deploy', gulpSequence('build', 'rsync', 'gh-pages'));

gulp.task('develop', ['watch', 'webserver']);

gulp.task('default', ['build']);