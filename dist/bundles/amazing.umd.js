(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

/// <reference path="./lib/index.d.ts" />
module.exports = require('./lib/index.js');

})));
