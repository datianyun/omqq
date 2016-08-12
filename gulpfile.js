var gulp = require('gulp');
var webpack = require('gulp-webpack');
var webConfig = require('./webpack.config.js');
var del = require('del');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var fileinclude = require('gulp-file-include');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
//清理文件
gulp.task('clean', function(){
	del('./dist/');
});

//打包react
gulp.task('webpack', function() {
  return gulp.src('./src/js/entry')
  .pipe(webpack(webConfig))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'));
});

//压缩css代码
gulp.task('cssmin', function(){
    gulp.src('src/css/export/*.css')
        .pipe(fileinclude())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});

//复制图片
gulp.task('copy-images', function(){
	gulp.src('src/image/*')
		.pipe(gulp.dest('dist/css/img/'));
});

gulp.task('build', ['clean','webpack','cssmin','copy-images']);
