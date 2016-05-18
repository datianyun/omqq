var gulp = require('gulp');
var webpack = require('gulp-webpack');
var webConfig = require('./webpack.config.js');
var del = require('del');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

//清理文件
gulp.task('clean', function(){
	del('./dist/');
});

//打包react
gulp.task('webpack', function() {
  return gulp.src('./src/js/entry')
  .pipe(webpack(webConfig))
  .pipe(gulp.dest('dist/js'));
});

//压缩CSS
gulp.task('cssmin', function () {
	gulp.src('src/css/*.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('html',function () {
    
})

gulp.task('build', ['clean','webpack','cssmin']);
