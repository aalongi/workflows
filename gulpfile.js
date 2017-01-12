//bring in the gulp library and assign it to this variable
//don't need libraries here (jquery and mustache)
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat');

var coffeeSources = ['components/coffee/tagline.coffee'];
//creating a single variable from all the javascript files
var jsSources = [
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js'
	];
//only need this one sheet because this sass document imports all the other stylesheets
var sassSources = ['components/sass/style.scss'];

//gulp task log example
//gulp.task('log', function() {
	//gutil.log('workflows are awesome');
//});

//**DOESN'T MATTER WHAT ORDER THESE TASKS ARE IN

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
		//don't need the reload here because it is at the end of js task.. and js task automatically accounts for coffee anyway
});

// **example** FOR BELOW: would run the compass task before the js task
//gulp.task('js', ['compass'], function() {

gulp.task('js', function() {
	gulp.src(jsSources)
		//What we want the concatinated file named as.. has to match what is in HTML
		.pipe(concat('script.js'))
		//adding another pipe command to send through browserify plugin
		.pipe(browserify())
		//where we want the concatanated file to appear.. has to match what is in HTML
		.pipe(gulp.dest('builds/development/js'))
		//letting the server know when something has changeed, reload page
		.pipe(connect.reload());
});


gulp.task('compass', function() {
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'components/sass',
			images: 'builds/development/images',
			style: 'expanded'
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest('builds/development/css'))
		//letting the server know when something has changeed, reload page
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	//specify what we want to monitor and which task to execute when something in those files change
	gulp.watch(coffeeSources, ['coffee']);
	//grabs updated coffee scripts and concatenates them into the script.js file that is ready by the html file
	//now will update on the index.html file in browser
	gulp.watch(jsSources, ['js']);
	//have to put individual file here because our sassSources just references the single scss sheet that imports the others
	//use a wildcard (*) to notice anything with .scss extensions
	gulp.watch('components/sass/*.scss', ['compass']);
});

//creating a task that starts up the server
gulp.task('connect', function() {
	connect.server({
		root: 'builds/development/',
		livereload: true
	});
});

// if you name this default instead of all then you can just run gulp with no suffix in the terminal 
gulp.task('default', ['coffee', 'js', 'compass', 'connect', 'watch']);