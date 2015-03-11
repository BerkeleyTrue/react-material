'use strict';
var gulp = require('gulp'),
    react = require('gulp-react'),
    babel = require('gulp-babel'),
    rimraf = require('gulp-rimraf'),
    gjslint = require('gulp-gjslint'),
    sync = require('browser-sync'),
    merge = require('merge2'),
    webpack = require('gulp-webpack');

var paths = {
  src: [
    './components/src/*.js',
    './style/*.js',
    './themes/*.js',
    './views/src/*.js'
  ],
  packed: [
    './assets/bundle.js',
    './assets/styles.css'
  ]

};

gulp.task('transpile', function() {
  var icons = gulp.src('./components/src/icons/*')
    .pipe(gulp.dest('./components/icons'));

  var components = gulp.src('./components/src/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./components'));

  var styles = gulp.src('./style/src/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./style'));

  var views = gulp.src('./views/src/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./views'));

  return merge([icons, components, styles, views]);
});

gulp.task('pack', ['transpile'], function() {
  return gulp.src('./views/src/DocumentationApplication.js')
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

gulp.task('default', ['transpile', 'pack', 'sync', 'watch']);
