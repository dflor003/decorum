var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var exorcist = require('exorcist');

gulp.task('deploy', function () {

    var bundledFileName = 'decorator-validations.js',
        sourceMapFileName = './dist/' + bundledFileName + '.map',
        globalNamespace = 'lib.validations';

    return browserify({
            entries: './src/main.ts',
            debug: true,
            standalone: globalNamespace
        })
        .plugin(tsify, { module: 'umd', target: 'es5', sourceMap: true })
        .bundle()
        .pipe(exorcist(sourceMapFileName))
        .pipe(source(bundledFileName))
        .pipe(gulp.dest('./dist'));
});