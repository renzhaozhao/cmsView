"use strict";

var gulp = require("gulp");
var cssTask = require("./tasks/less");
var watchTask = require("./tasks/watch");

gulp.task("less", cssTask);

gulp.task("watch", watchTask);

gulp.task('init', ['less']);
gulp.task('default', ['watch']);
