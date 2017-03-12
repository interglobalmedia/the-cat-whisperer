const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const del = require('del');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

gulp.task('previewDist', () => {
	browserSync.init({
		notify: false,
		server: {
			baseDir: 'dist'
		}
	});
});

gulp.task('deleteDistFolder', () => {
	return del('./dist');
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], () => {
	const pathsToCopy = [
		'./app/**/*',
		'!./app/index.html',
		'!./app/assets/images/**',
		'!./app/assets/styles/**',
		'!./app/assets/scripts/**',
		'!./app/temp',
		'!./app/temp/**'
	]
	return gulp.src(pathsToCopy)
		.pipe(gulp.dest('./dist'));
});

gulp.task('optimizeImages', ['deleteDistFolder'], () => {
	return gulp.src('./app/assets/images/**/*')
		.pipe(imagemin({
			progressive: true,
			interlaced: true,
			multipass: true
		}))
		.pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('useminTrigger', ['deleteDistFolder'], () => {
	gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], () => {
	return gulp.src('./app/index.html')
		.pipe(usemin({
			css: [() => rev(), () => cssnano()],
			js: [() => rev(), () => uglify()]
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);
