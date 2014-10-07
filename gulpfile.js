'use strict';

var concat = require('gulp-concat'),
	gulp = require('gulp'),
	ngAnnotate = require('gulp-ng-annotate'),
	jade = require('gulp-jade'),
	less = require('gulp-less'),
	cssmin = require('gulp-cssmin'),
	uglify = require('gulp-uglify');

var admin_scripts = ['./admin/js/*.js',];
var admin_scripts_dest = './public/admin/js/';

var website_scripts = ['./website/js/*.js',];
var website_scripts_dest = './public/website/js/';

var admin_templates = ['./admin/template/*.jade'];
var admin_templates_dest = './public/admin/template/';

var website_templates = ['./website/template/*.jade'];
var website_templates_dest = './public/website/template/';

var views_website_templates = ['./views/website/*.jade'];
var views_website_templates_dest = './views/website/compiled/';

var views_admin_templates = ['./views/admin/*.jade'];
var views_admin_templates_dest = './views/admin/compiled/';

var admin_stylesheet = ['./admin/css/*.less'];
var admin_stylesheet_dest = './public/admin/css/';

var website_stylesheet = ['./website/css/*.less'];
var website_stylesheet_dest = './public/website/css/';

gulp.task('scripts', function() {
	var _task = function(src, dest) {
		gulp
		.src(src)
		.pipe(concat('main.min.js'))
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(gulp.dest(dest));
	};

	_task(admin_scripts, admin_scripts_dest);
	_task(website_scripts, website_scripts_dest);
});

gulp.task('templates', function() {
	var _task = function(src, dest) {
		gulp
		.src(src)
		.pipe(jade())
		.pipe(gulp.dest(dest));
	};
	
	_task(admin_templates, admin_templates_dest);
	_task(website_templates, website_templates_dest);
	_task(views_website_templates, views_website_templates_dest);
	_task(views_admin_templates, views_admin_templates_dest);
});

gulp.task('stylesheet', function() {
	var _task = function(src, dest) {
		gulp
		.src(src)
		.pipe(concat('main.min.css'))
		.pipe(less())
		.pipe(cssmin())
		.pipe(gulp.dest(dest));
	};

	_task(admin_stylesheet, admin_stylesheet_dest);
	_task(website_stylesheet, website_stylesheet_dest);
});

gulp.task('watch', function() {
	gulp.watch(admin_scripts, ['scripts']);
	gulp.watch(website_scripts, ['scripts']);

	gulp.watch(admin_templates, ['templates']);
	gulp.watch(website_templates, ['templates']);

	gulp.watch(views_admin_templates, ['templates']);
	gulp.watch(views_website_templates, ['templates']);

	gulp.watch(admin_stylesheet, ['stylesheet']);
	gulp.watch(website_stylesheet, ['stylesheet']);
});


gulp.task('default', ['scripts', 'templates', 'stylesheet', 'watch']);