var gulp = require('gulp');
var webpack = require('gulp-webpack');
var webConfig = require('./webpack.config.js');
gulp.task('default', function() {
  return gulp.src('./index.js')
  .pipe(webpack(webConfig))
  .pipe(gulp.dest('dist'));
});
