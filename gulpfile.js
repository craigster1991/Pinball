var gulp = require('gulp'),
    // coffee = require('gulp-coffee'),
    gutil = require('gulp-util'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    sequence = require('gulp-sequence'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    minifyCSS = require('gulp-minify-css'),
    rimraf = require('gulp-rimraf'),
    // rimraf = require('rimraf'),
    cache = require('gulp-cache');


// gulp.task('coffee', function() {
//   gulp.src('development/scripts/coffee/*.coffee')
//     .pipe(coffee({bare: true}).on('error', gutil.log))
//     .pipe(gulp.dest('development/scripts/coffee_compiled'))
//     .pipe(notify({ message: 'coffee task complete' }));
// });

// gulp.task('jshint_coffee', function() {
//     return gulp.src('development/scripts/coffee_compiled/*.js')
//       .pipe(jshint())
//       .pipe(jshint.reporter('default'))
//       .pipe(notify({ message: 'Jshint_coffee task complete' }));
// });

gulp.task('jshint', function() {
    return gulp.src('development/scripts/js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(notify({ message: 'Jshint task complete' }));
});

// gulp.task('libscripts', function() {
//     return gulp.src('development/scripts/lib/*.js')
//       .pipe(concat('lib.js'))
//       .pipe(gulp.dest('production/scripts/public'))
//       .pipe(notify({ message: 'Lib scripts task complete' }));
// });

// gulp.task('devscripts', function() {
//     return gulp.src('development/scripts/js/*.js')
//       .pipe(concat('dev.js'))
//       .pipe(gulp.dest('production/scripts/public'))
//       .pipe(notify({ message: 'Dev scripts task complete' }));
// });

gulp.task('scripts', function() {
    return gulp.src(['development/scripts/lib/*.js', 'development/scripts/js/*.js'])
      .pipe(concat('all.js'))
      .pipe(gulp.dest('production/scripts/public'))
      .pipe(rename('all.min.js'))
      .pipe(uglify({mangle:true}))
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

// gulp.task('clean', function() {
//   return gulp.src(['production/scripts/public/*.*', 'production/images/*.*'], { read: false })
//     .pipe(rimraf());
// });

gulp.task('cleanjs', function() {
  return gulp.src(['production/scripts/public/all.js'], { read: false })
    .pipe(rimraf());
});

// gulp.task('default', ['clean'], function() {
//     gulp.start('coffee', 'jshint_coffee', 'jshint', 'libscripts', 'devscripts', 'scripts', 'images', 'css', 'watch');
// });

gulp.task('default', sequence('clean', 'jshint', 'scripts', 'cleanjs', 'images', 'css', 'watch'));

gulp.task('watch', function() {
  gulp.watch('development/scripts/js/*.js', ['jshint', 'scripts', 'cleanjs']);
  gulp.watch('development/scripts/lib/*.js', ['jshint', 'scripts', 'cleanjs']);
  gulp.watch('development/images/**/*', ['images']);
  gulp.watch('development/css/*.css', ['css']);
});