var gulp = require('gulp');
var rename = require('gulp-rename');
var inlineNg2Template = require('gulp-inline-ng2-template');

gulp.task('inline-code', function () {
  gulp.src('./app/**/*.ts')
    .pipe(inlineNg2Template({ base: '/app', useRelativePaths: true }))
        .pipe(gulp.dest('temp/'));
});

gulp.task('copy-libs', function () {
  gulp.src('./node_modules/core-js/**/*')
    .pipe(gulp.dest('dist/app/node_modules/core-js'))
  gulp.src('./node_modules/zone.js/**/*')
    .pipe(gulp.dest('dist/app/node_modules/zone.js'))
  gulp.src('./node_modules/reflect-metadata/**/*')
    .pipe(gulp.dest('dist/app/node_modules/reflect-metadata'))
  gulp.src('./node_modules/systemjs/**/*')
    .pipe(gulp.dest('dist/app/node_modules/systemjs'))
  gulp.src('./node_modules/primeng/**/*')
    .pipe(gulp.dest('dist/app/node_modules/primeng'))
  gulp.src('./app/libs/**/*')
    .pipe(gulp.dest('dist/app/libs'))
  gulp.src('./app/css/**/*')
    .pipe(gulp.dest('dist/app/css'))
});