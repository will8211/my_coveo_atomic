const gulp = require ('gulp')
const debug = require('gulp-debug');
const exec = require('child_process').exec;
const livereload = require('gulp-livereload');

gulp.task('copyTestPages', function () {
    return gulp.src(['./testPages/*.html'], { "base" : "./testPages" })
        .pipe(gulp.dest('./public/testPages'))
});

gulp.task("copyResource", function () {
    return gulp.src([
            './node_modules/@coveo/atomic/dist/atomic/**/*'],
        { "base" : "./node_modules/@coveo/atomic/dist/" })
        .pipe(gulp.dest('./public/'))
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
gulp.task('default', gulp.series('copyResource','copyTestPages',function () {}));

gulp.task('dev', gulp.series('copyResource','copyTestPages', gulp.parallel('serveStart', 'watch'),function () {}));
