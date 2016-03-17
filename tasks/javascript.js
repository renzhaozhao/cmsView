"use strict";

var config = require("./config");
var settings = config.settings;

var uglify = require('gulp-uglify');
var clone = require("gulp-clone");
var rename = require("gulp-rename");
var plumber = require("gulp-plumber");

var transport = require("gulp-seajs-transport");

var gulp = require("gulp");

var ac = require('./copyright');


var projectPath = config.releasePath;

module.exports =  function(callback){
	var stream, uncompressStream, compressStream;

	gulp.src(["src/js/**/*.js", "!src/js/config.js"])
		.pipe(plumber({
			errorHandler: function(err){
				console.log(err.toString());
				this.emit("end");
			}
		}))
		/*.pipe(transport())
		.pipe(uglify({
			preserverComments: !true,
			ascii_only: true,
		}))*/
		.pipe(ac())
		.pipe(gulp.dest(projectPath + "js/"));

	gulp.src("src/js/config.js")
		.pipe(plumber({
			errorHandler: function(err){
				console.log(err.toString());
				this.emit("end");
			}
		}))
		.pipe(uglify())
		.pipe(ac())
		.pipe(gulp.dest(projectPath + "js/"))
		.on("end", callback);
};