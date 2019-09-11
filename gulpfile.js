'use strict';

const gulp = require('gulp');
const browsersync = require("browser-sync").create();
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');

const site_name = 'librarydirectorstoolkit.local'

//browser sync
function browserSync(done) {
  browsersync.init({
    server: "./site/"
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

//compile scss to css
function css(){
  return gulp
    .src('src/scss/*.scss')
    .pipe(sass({
        includePaths: require('scss-resets').includePaths
      }).on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('site/assets/css'))
    .pipe(browsersync.stream());
  done();
}

// Watch files
function watchFiles() {
  return gulp
    .watch("./src/scss/**/*", css);
  done();
  //gulp.watch("./assets/js/**/*", gulp.series(scriptsLint, scripts));
}

const build = gulp.parallel(css);
const watch = gulp.parallel(browserSync);

exports.css = css;
exports.build = build;
exports.watch = watch;
exports.default = build;
