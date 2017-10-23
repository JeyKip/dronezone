'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const sourcemap = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const gulpIf = require('gulp-if');
const autoprefixer = require('gulp-autoprefixer');
const cached = require('gulp-cached');
const path = require('path');
const del = require('del');
const browserSync = require('browser-sync').create();
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('less', function(){
    return gulp.src('dev/styles/*.less')
               .pipe(gulpIf(isDev, sourcemap.init()))
               // fix pathes to images according to file structure of production build
               .pipe(less({
                    rootpath: 'img/',
                    relativeUrls: true
                }))
               .pipe(autoprefixer())
               .pipe(cssmin())
               .pipe(rename({suffix: '.min'}))
               .pipe(gulpIf(isDev, sourcemap.write()))
               .pipe(gulp.dest('build/styles'));
});

gulp.task('scripts', function(){
    return gulp.src('dev/scripts/*.js')
               .pipe(gulpIf(isDev, sourcemap.init()))
               .pipe(concat('script.js'))
               .pipe(uglify())
               .pipe(rename({suffix: '.min'}))
               .pipe(gulpIf(isDev, sourcemap.write()))
               .pipe(gulp.dest('build/scripts'));
});

gulp.task('assets', function(){
    return gulp.src('dev/assets/**/*.*')
               .pipe(cached('assets'))
               .pipe(gulp.dest('build'));
});

gulp.task('images', function(){
    return gulp.src('dev/styles/**/*.{png,svg,jpg,jpeg}')
               .pipe(cached('images'))
               .pipe(gulp.dest('build/styles/img'));
});

gulp.task('fonts', function(){
    return gulp.src('dev/fonts/**/*.*', {since: gulp.lastRun('fonts')})
               .pipe(gulp.dest('build/styles/fonts'));
});

gulp.task('clean', function(){
    return del('build');
});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('less', 'scripts', 'assets', 'fonts', 'images')));

gulp.task('watch', function(){
    gulp.watch('dev/styles/**/*.less', gulp.series('less'));
    gulp.watch('dev/scripts/*.js', gulp.series('scripts'));
    gulp.watch('dev/assets/**/*.*', gulp.series('assets'))
        .on('unlink', function(filePath){ deleteFileFromCache('assets', filePath); });
});

gulp.task('serve', function(){
    browserSync.init({
        server: 'build'
    });
    browserSync.watch('build/**/*.*').on('change', browserSync.reload);
});

// tasks for building site for different environments
gulp.task('development', gulp.series('build', gulp.parallel('watch', 'serve')));
gulp.task('production', gulp.series('build'));

function deleteFileFromCache(cacheName, fileName) {
    delete cached.caches[cacheName][path.resolve(fileName)];
}