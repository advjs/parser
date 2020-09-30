const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.release.json');

gulp.task('default', function () {
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'))
    .pipe(gulp.dest('demo/parser'));
});
