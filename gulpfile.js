var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var rename = require("gulp-rename");

var $ = require('gulp-load-plugins')({lazy: true});

/**
 List the avalable gulp tasks
 */
gulp.task('default', function () {
    console.log('=================> Gulp is Running!')
});


/**
 SASS
*/
gulp.task('sass', function () {
 gulp.src('./scss/core.scss')
 .pipe(sass.sync().on('error', sass.logError))
 .pipe(gulp.dest('./public/css'))
 .pipe(csso())
 .pipe(rename("./core.min.css"))
 .pipe(gulp.dest('./public/css'));

});

