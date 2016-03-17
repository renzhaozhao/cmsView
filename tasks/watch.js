"use strict";

var config = require("./config");
var cssTask = require("./less");

var gulp = require("gulp");

module.exports = function(callback){
	var lessSources = config.projectPath + config.lessSource + "**/*.less";

	gulp.watch(lessSources, function(file){
		gulp.start("less", cssTask);
	});
};