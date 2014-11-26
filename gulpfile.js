var gulp       = require('gulp'),
    livereload = require('gulp-livereload'),
    express_server = require('gulp-express'),
    //run        = require('gulp-run'),
    sass       = require('gulp-sass');

gulp.task('js_vendor', function() {
  gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js'
  ]).pipe(gulp.dest('public/dist'));
});

gulp.task('js_main', function() {
  gulp.src([
    'assets/scripts/main.js'
  ]).pipe(gulp.dest('public/dist'));
});

gulp.task('sass', function() {
  var sass_config = {
    includePaths: [
      'bower_components/bootstrap-sass-official/assets/stylesheets'
    ]
  };
  gulp.src('assets/styles/app.scss')
      .pipe(sass(sass_config))
      .pipe(gulp.dest('public/dist'));
});

gulp.task('express', function() {
  console.log('Starting Express Server...');
  express_server.run({
    file: 'bin/www',
    port: 35730
  });
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('assets/styles/**/*.scss', ['sass']);
  gulp.watch('assets/scripts/**/*.js', ['js_main']);
  gulp.watch(['public/**', 'views/**'])
      .on('change', livereload.changed);

  gulp.watch(['./*.js', 'routes/**/*.js'], ['express'])
      .on('change', function(event) {
        setTimeout(function() {
          livereload.changed(event.path);
        }, 1000);
      });
});

gulp.task('default', [
  'js_vendor',
  'js_main',
  'sass',
  'express',
  'watch'
]);
