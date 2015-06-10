'use strict';
require('babel/register');
var gulp = require('gulp'),
    babel = require('gulp-babel'),
    eslint = require('gulp-eslint'),
    rename = require('gulp-rename'),
    reactifySVG = require('./gulp-reactifySVG'),
    sync = require('browser-sync'),
    webpack = require('gulp-webpack');

var paths = {
  webpackFiles: [
    './index.html',
    './assets/bundle.js',
    './assets/styles.css'
  ],
  js: {
    src: [
      'src/**/*.js',
      'src/**/*.jsx'
    ],
    dest: 'lib/'
  },
  icons: {
    src: ['src/icons/*.html'],
    dest: 'lib/icons'
  },
  docs: [
    'docs/**/*.jsx',
    'docs/**/*.js'
  ],
  packed: './assets'
};

gulp.task('transpile', function() {
  return gulp.src(paths.js.src)
    .pipe(babel())
    .pipe(gulp.dest(paths.js.dest));
});

gulp.task('svg', function() {
  return gulp.src(paths.icons.src)
    .pipe(reactifySVG())
    .pipe(rename({
      extname: '.jsx'
    }))
    .pipe(babel())
    .pipe(gulp.dest(paths.icons.dest));
});

gulp.task('pack', ['svg', 'transpile'], function() {
  return gulp.src(paths.docs + '/DocumentationApplication.js')
    .pipe(webpack(require('./webpack.config.js')))
      .pipe(gulp.dest('assets/'));
});

gulp.task('sync', ['pack'], function(cb) {
  sync({
    server: {
      baseDir: './',
      index: './index.html'
    },
    files: paths.webpackFiles,
    port: 9000,
    open: true
  }, function() {
    cb();
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.js.src.concat(paths.docs), ['pack']);
});

gulp.task('lint', function() {
  return gulp.src(paths.js.src)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('default', ['transpile', 'pack', 'sync', 'watch']);
