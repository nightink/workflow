'use strict';

var iconv = require('iconv-lite');
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var charset = require('./charset');

var PLUGIN_NAME = 'gulp:charset';
var debug = require('debug')(PLUGIN_NAME);


// plugin level function (dealing with files)
function gulpCharset(options) {
  if(!options.encoding) {
    throw new PluginError(PLUGIN_NAME, 'Missing encoding option!');
  }

  // creating a stream through which each file will pass
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      console.warn('[%s] file is null', PLUGIN_NAME);
      cb(null, file);
    }

    if (file.isBuffer()) {
      debug('file is buffer');
      file.contents = iconv.encode(file.contents.toString(), options.encoding);
    }

    if (file.isStream()) {
      debug('file is stream');
      this.emit('error',
        new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
    }

    this.push(file);
    return cb();
  });
}

module.exports = gulpCharset;
