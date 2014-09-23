var gulp = require('gulp'),
    coffee = require('gulp-coffee'),
    gutil = require('gulp-util'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    minifyCSS = require('gulp-minify-css'),
    cache = require('gulp-cache');
    
    
gulp.task('coffee', function() {
  gulp.src('development/scripts/coffee/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('development/scripts/coffee_compiled'))
    .pipe(notify({ message: 'coffee task complete' }));
});

gulp.task('lint_coffee', function() {
    return gulp.src('development/scripts/coffee_compiled/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(notify({ message: 'Lint_coffee task complete' }));
});

gulp.task('lint', function() {
    return gulp.src('development/scripts/js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(notify({ message: 'Lint task complete' }));
});

gulp.task('scripts', function() {
    return gulp.src('development/scripts/js/*.js')
      .pipe(concat('all.js'))
      .pipe(gulp.dest('production/scripts/public'))
      .pipe(rename('all.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('production/scripts/public'))
      .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('development/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('production/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('css', function() {
  return gulp.src('development/css/*.css')
    .pipe(minifyCSS({keepBreaks:false}))
    .pipe(gulp.dest('production/css'))
    .pipe(notify({ message: 'Css task complete' }));
});

gulp.task('clean', function() {
  return gulp.src(['production/scripts/public', 'production/images'], {read: false})
    .pipe(clean())
    .pipe(notify({ message: 'Clean task complete' }));
});

gulp.task('default', ['clean'], function() {
    gulp.start('coffee', 'lint_coffee', 'lint', 'scripts', 'images', 'css', 'watch');
});

gulp.task('watch', function() {

  // Watch .js files
  gulp.watch('development/scripts/*.js', ['lint', 'scripts']);

  // Watch image files
  gulp.watch('development/images/**/*', ['images']);
  
  gulp.watch('development/css/*.css', ['css']);

});