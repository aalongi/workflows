//bring in the gulp library and assign it to this variable
var gulp = require('gulp'),
	gutil = require('gulp-util');

gulp.task('log', function() {
	gutil.log('workflows are awesome');
});