var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
var prefix = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  styles: './scss/**/*.scss',
  build: './css',
  masterStyle: './scss/app.scss'
};

gulp.task('sass', function () {
  gulp.src(paths.masterStyle)
    .pipe(plumber())
    .pipe(scsslint())
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed',
        includePaths: ['bower_components/foundation/scss']
      }).on('error', sass.logError))
    .pipe(prefix())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.build))
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.styles, ['sass']);
});

gulp.task('default', ['watch']);


