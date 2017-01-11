//bring in the gulp library and assign it to this variable
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	concat = require('gulp-concat');

var coffeeSources = ['components/coffee/tagline.coffee'];
//creating a single variable from all the javascript files
var jsSources = [
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js'
	];

//gulp task log example
//gulp.task('log', function() {
	//gutil.log('workflows are awesome');
//});



gulp.task('coffee', function() {
	//original location of what I want to process
	//can be an array or an individual file
	gulp.src(coffeeSources)
		//sending the contents from what we got from source method to what we got through coffee gulp plugin
		//bare: true option compiles javascript without putting it through 'safety wrapper'
		.pipe(coffee({ bare: true })
			//by default coffee plugin will send an error whenever there is invalid coffee script
			//if you don't catch the error, the terminal would crash
			//.on('error') won't stop the execution of any other gulp task, just sending in log to console
			.on('error', gutil.log))
		//taking results of coffee command and piping it somewhere else..
		//will name whatever the old file was named but just with .js extension
		.pipe(gulp.dest('components/scripts'));
});

gulp.task('js', function() {
	gulp.src(jsSources)
		//What we want the concatinated file named as.. has to match what is in HTML
		.pipe(concat('script.js'))
	//where we want the concatanated file to appear.. has to match what is in HTML
	.pipe(gulp.dest('builds/development/js'));
});