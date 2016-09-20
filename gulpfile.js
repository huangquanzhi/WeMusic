'use strict';

var runSequence = require('run-sequence');
var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var eslint = require('gulp-eslint');
var webpack = require('webpack');
var webpackConfig = require('./webpack.dev.config');
var WebpackDevServer = require('webpack-dev-server');
var shell = require('gulp-shell');
var uglify = require('gulp-uglify');
//var gzip = require('gulp-gzip');

//CL EX: NODE_ENV=production gulp dev

var destRoot = webpackConfig.destRoot;
var destAssetFolder = webpackConfig.destAssetFolder; //destRoot + '/deloitte/assets';


gulp.task('copy', function() {
  var indexHtml;
  indexHtml.pipe(gulp.dest(destRoot));
  
  gulp.src(['app/song/**/*.*']).pipe(gulp.dest(destRoot + '/song'));

});




