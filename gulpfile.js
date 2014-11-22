var gulp       = require('gulp'),
    livereload = require('gulp-livereload'),
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
  var debug = require('debug');
  var app = require('./app');
  app.set('port', process.env.PORT || 3000);
  var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
  });
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('assets/styles/**/*.scss', ['sass']);
  gulp.watch('assets/scripts/**/*.js', ['js_main']);
  gulp.watch([
        'public/**',
        'views/**'
      ]
  ).on('change', livereload.changed);
});

gulp.task('default', [
  'js_vendor',
  'js_main',
  'sass',
  'watch'
]);
