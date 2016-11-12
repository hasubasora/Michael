var gulp = require('gulp'),
		runSequence = require('run-sequence'),
		browserSync = require('browser-sync').create(),
		del = require('del'),
		compass = require('gulp-compass'),
		ngAnnotate = require('gulp-ng-annotate'),
		ngmin = require('gulp-ngmin'),
		stripDebug = require('gulp-strip-debug'),
		concat = require('gulp-concat'),
		//var minifyCss = require('gulp-minify-css');//尚不考虑css压缩
		rename = require('gulp-rename'),
		uglify = require('gulp-uglify'),
		jshint = require('gulp-jshint');



gulp.task('default',  ['jshint'],function() {
	  gulp.start('minifyjs');
  return runSequence(['clean'], ['build'], ['serve', 'watch']);
});

gulp.task('clean', function(callback) {
  return del('./dist/', callback);
});

gulp.task('build', function(callback) {
  return runSequence(['compass', 'staticFiles'], callback);
});

gulp.task('compass', function() {
  return gulp.src('./src/**/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'src/stylesheets',
      sass: 'src/sass'
    }))
    .on('error', function(err) {
      console.log(err);
      this.emit('end');
    })
    .pipe(gulp.dest('./dist/stylesheets/'));
});

//压缩，合并 js
gulp.task('minifyjs',function() {
  return gulp.src('./src/javascripts*/**/*.js')      //需要操作的文件
    .pipe(concat('main.js'))    //合并所有js到main.js
    .pipe(gulp.dest('./dist/javascripts/'))       //输出到文件夹
    .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
    .pipe(ngAnnotate())
    .pipe(ngmin({dynamic: false}))//Pre-minify AngularJS apps with ngmin
    .pipe(stripDebug())//除去js代码中的console和debugger输出
    .pipe(uglify({outSourceMap: false}))    //压缩
    .pipe(gulp.dest('./dist/javascripts/'));  //输出
});

gulp.task('jshint', function () {
  return gulp.src('./src/javascripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
gulp.task('staticFiles', function() {
  return gulp.src([
      './src/**/*.html',
      './src/images*/**/*.*',
      './src/javascripts*/**/*.js',
      './src/stylesheets*/**/*.css'
    ])
    .pipe(gulp.dest('./dist/'));
})

gulp.task('serve', function() {
  browserSync.init({
    server: './dist',
    port: 8888
  });
});

gulp.task('reload', function() {
  return browserSync.reload();
});

gulp.task('watch', function() {
  return gulp.watch([
    './src/**/*.html',
    './src/**/*.scss',
    './src/**/*.js'
  ], function() {
    return runSequence(['build'], ['reload']);
  })
});