'use strict';

let browserify = require('browserify');
let gulp = require('gulp');
let source = require('vinyl-source-stream');
let tsify = require("tsify");
let exorcist = require('exorcist');
let ts = require('gulp-typescript');
let dts = require('dts-bundle');
let Promise = require('bluebird');
let gutil = require('gulp-util');
let del = require('del');

function log() {
    gutil.log.apply(gutil.log, arguments);
}

function error() {
    let args = Array.prototype.slice.call(arguments, 0).map(arg => gutil.colors.bold.red(arg));
    log.apply(null, args);
}

gulp.task('publish', function () {
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

gulp.task('typedef', () => {
    let buildDeclarations = new Promise((resolve, reject) => {
        log('Generating base TypeScript declarations...');
        gulp.src('./src/**/*.ts')
            .pipe(ts({
                target: 'ES6',
                declaration: true,
                noExternalResolve: true
            })).dts
            .on('error', reject)
            .pipe(gulp.dest('./build/dts'))
            .on('end', resolve);
    });
    
    return buildDeclarations
        .then(() => {
            log('Bundling TypeScript declarations...');
            dts.bundle({
                name: 'decorator-validations',
                main: './build/dts/main.d.ts',
                out: '../../dist/decorator-validations.d.ts'
            });
        })
        .then(() => {
            log('Deleting temp declaration files...');
            del('./build/dts');
        })
        .catch((err) => error(err));
});