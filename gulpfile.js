const gulp = require("gulp");
const debug = require("gulp-debug");
const exec = require("child_process").exec;
const livereload = require("gulp-livereload");
const download = require("gulp-download");

function installAtomicAlpha(cb) {
  exec("npm i @coveo/atomic@alpha", function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
}

function getTestPage() {
  return download(
    "https://raw.githubusercontent.com/coveo/ui-kit/master/packages/atomic/src/pages/index.html"
  ).pipe(gulp.dest("public/"));
}

function copyResource() {
  return gulp
    .src(["./node_modules/@coveo/atomic/dist/atomic/**/*"])
    .pipe(gulp.dest("./public/build/"))
    .pipe(debug());
}

function copyThemes() {
  return gulp
    .src(["./public/build/themes/**/*"])
    .pipe(gulp.dest("./public/themes"))
    .pipe(debug());
}

function serveStart(cb) {
  exec("npx serve", function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
}

function watch() {
  livereload.listen();
  gulp.watch("./testPages/*.html", gulp.series(getTestPage));
}

exports.default = gulp.series(
  installAtomicAlpha, 
  copyResource,
  copyThemes,
  getTestPage
);

exports.dev = gulp.series(
  installAtomicAlpha,
  copyResource,
  copyThemes,
  getTestPage,
  gulp.parallel(serveStart, watch)
);
