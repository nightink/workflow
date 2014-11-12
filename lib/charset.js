'use strict';

var util = require('util');
var stream = require('stream');
var iconv = require('iconv-lite');

module.exports = function(options) {
  return new CharsetTransform(options);
};

exports.CharsetTransform = CharsetTransform;

var Transform = stream.Transform;
function CharsetTransform(options) {
  // set encoding
  this._encoding = options.encoding;
  Transform.call(this, arguments);
}

util.inherits(CharsetTransform, Transform);

CharsetTransform.prototype._transform = function(chunk, encoding, cb) {
  var str = chunk.toString();
  // file charset
  this.push(iconv.encode(str, this._encoding));
  cb();
};

CharsetTransform.prototype._flush = function(cb) {
  cb();
};
