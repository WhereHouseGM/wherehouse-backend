const gulp = require('gulp');
const { series } = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const eslint = require('gulp-eslint');

gulp.task('clean', function() {
	return del(['dist/**', 'dist']);
});

gulp.task('build', function() {
	return tsProject.src()
		.pipe(tsProject())
		.js.pipe(gulp.dest('dist'));
});

gulp.task('lintAndFormat', function() {
	return tsProject.src()
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
})

gulp.task('default', series('clean', 'lintAndFormat', 'build'));
