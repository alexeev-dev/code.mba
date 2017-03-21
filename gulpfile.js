var gulp = require('gulp'),
	browserSync = require('browser-sync').create();


gulp.task('browser-sync', function() {
	browserSync.init({server: { baseDir: 'app'}});
});

// WATCH
gulp.task('watch', ['browser-sync'], function () {
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/**/*.css', browserSync.reload);
	gulp.watch('app/**/*.js', browserSync.reload);
});