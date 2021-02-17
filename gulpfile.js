const gulp = require ('gulp')
const debug = require('gulp-debug');
const exec = require('child_process').exec;
const livereload = require('gulp-livereload');
const download = require("gulp-download");

gulp.task('installAtomicAlpha', function (cb) {
    exec('npm i @coveo/atomic@alpha', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('getTestPage', function () {
    return download('https://raw.githubusercontent.com/coveo/ui-kit/master/packages/atomic/src/index.html')
	.pipe(gulp.dest("public/"));
});

gulp.task("copyResource", function () {
    return gulp.src(['./node_modules/@coveo/atomic/dist/atomic/**/*'])
        .pipe(gulp.dest('./public/build/'))
        .pipe(debug());

})

gulp.task('serveStart', function (cb) {
    exec('serve', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./testPages/*.html', gulp.series('copyTestPages'));

});

gulp.task('default', gulp.series('installAtomicAlpha', 'copyResource','getTestPage',function () {}));
gulp.task('dev', gulp.series('installAtomicAlpha', 'copyResource','getTestPage', gulp.parallel('serveStart', 'watch'),function () {}));
