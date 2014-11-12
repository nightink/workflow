'use strict';

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var glob = require('glob');
var iconv = require('iconv-lite');
var wt = require('wt');
var charset = require('./lib/charset');

var srcFiles = glob.sync('project/**/*.js');

// build if
if(!fs.existsSync('build')) {
  exec('mkdir build');
}

var watcher = wt.watch(srcFiles);
watcher.on('all', function(info) {
  console.log(info);
});

srcFiles.forEach(function(srcFile) {
  var basename = path.basename(srcFile);
  fs.createReadStream(srcFile)
    .pipe(charset())
    .pipe(fs.createWriteStream(path.join(process.cwd(), 'build', basename), {
      encoding: 'gbk'
    }));
});
