'use strict';

var program = require('commander');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var gulpCharset = require('./lib/gulp-charset-transform');

program
  .option('-p path <file path>', 'file path', String)
  .option('-e encoding <file encoding>', 'file encoding', String)
  .parse(process.argv);

var paths = {
  script: './project/**/*.js',
  dist: program.path || './build',
  jshintrc: __dirname + '/.jshintrc'
};

console.log(program)

gulp.task('lint', function() {
  var jshintOpts = {
    defaultFile: paths.jshintrc,
    lookup: false
  };

  gulp.src(paths.script)
    .pipe(jshint(jshintOpts))
    .pipe(jshint.reporter('default'));
});

gulp.task('build', function() {
  gulp.src(paths.script)
    .pipe(gulpCharset({
      encoding: program.encoding
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', function() {
  gulp.watch(paths.script, ['lint', 'build']);
});

gulp.task('default', ['lint', 'build', 'watch']);
