'use strict';

var program = require('commander');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var glob = require('glob');
var gulpCharset = require('./lib/gulp-charset-transform');

program
  .option('-p path <file path>', 'file path', String)
  .option('-e encoding <file encoding>', 'file encoding', String)
  .parse(process.argv);

var paths = {
  script: './project/**/*.js',
  style: './project/**/*.less',
  dist: program.path || './build',
  jshintrc: __dirname + '/.jshintrc'
};

gulp.task('lint', function() {
  var jshintOpts = {
    defaultFile: paths.jshintrc,
    lookup: false
  };

  gulp.src(paths.script)
    .pipe(jshint(jshintOpts))
    .pipe(jshint.reporter('default'));
});

gulp.task('less', function() {
  gulp.src(paths.style)
    .pipe(less({
      paths: glob.sync(paths.style)
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('script', function() {
  gulp.src(paths.script)
    .pipe(gulpCharset({
      encoding: program.encoding
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build', ['less', 'script']);

gulp.task('watch', function() {
  gulp.watch([paths.script, paths.style], ['lint', 'build']);
});

gulp.task('default', ['lint', 'build', 'watch']);
