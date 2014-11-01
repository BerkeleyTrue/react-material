'use strict';
var gulp = require('gulp'),
    react = require('gulp-react'),
    rimraf = require('gulp-rimraf'),
    gjslint = require('gulp-gjslint'),
    sync = require('browser-sync'),
    webpack = require('gulp-webpack');

var paths = {
  src: [
    './components/*.js',
    './style/*.js',
    './themes/*.js',
    './views/*.js'
  ],
  packed: [
    './assets/bundle.js',
    './assets/styles.css'
  ]

};

gulp.task('pack', function() {
  return gulp.src('./views/DocumentationApplication.js')
    .pipe(webpack(require('./webpack.config.js')))
      .pipe(gulp.dest('assets/'));
});

gulp.task('sync', ['pack'], function(cb) {
  sync({
    server: {
      baseDir: './',
      index: './index.html'
    },
    files: [
      './index.html',
      './assets/bundle.js',
      './assets/styles.css'
    ],
    port: 9000,
    open: true
  }, function() {
    cb();
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.src, ['pack']);
});

gulp.task('lint', function() {
  return gulp.src(paths.src)
    .pipe(react())
    .pipe(gulp.dest('./assets'))
    .pipe(gjslint({ flags: ['--nojsdoc'] }))
    .pipe(gjslint.reporter('console'))
    .pipe(rimraf());
});

gulp.task('default', ['pack', 'sync', 'watch']);
