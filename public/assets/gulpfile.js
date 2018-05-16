var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('sass', function() {
  return gulp.src('scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css/'));
});

gulp.task('minify', function() {
    return gulp.src('scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('css/'));
});

gulp.task('autoprefixer', function () {
    return gulp.src('scss/**/*.scss')
        .pipe(postcss([ autoprefixer() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('scss'));
});


gulp.task('build', ['sass', 'autoprefixer', 'minify']);

gulp.task('default', ['sass'], function() {
  gulp.watch('scss/**/*.scss', ['sass']);
});
