const gulp = require('gulp');
const watch = require('gulp-watch');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssvars = require('postcss-simple-vars');
const nested = require('postcss-nested');
const cssImport = require('postcss-import');
const browserSync = require('browser-sync').create();

gulp.task('html', () => {
	console.log('I just created my first gulp task!');
});

gulp.task('styles', () => {
	return gulp.src('./app/assets/styles/styles.css')
        .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
        .pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('watch', () => {

	browserSync.init({
		notify: false,
		server: {
			baseDir: 'app'
		}
	});

	watch('./app/index.html', () => {
		browserSync.reload();
	});

	watch('./app/assets/styles/**/*.css', () => {
		gulp.start('cssInject');
	});
});

gulp.task('cssInject', () => {
	return gulp.src('./app/temp/styles/styles.css')
		.pipe(browserSync.stream());
});
