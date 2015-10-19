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
let path = require('path');
let karma = require('karma');

/* Tasks */
gulp.task('default', ['compile']);

gulp.task('compile', () => {
    banner('Compiling TypeScript Files');

    let projectPath = path.join('.', 'tsconfig.json');
    let project = ts.createProject(projectPath);
    let result = project.src().pipe(ts(project));

    return asPromise(result.js.pipe(gulp.dest('.')))
        .then(() => log('Done compiling TypeScript files!'))
        .catch(() => error('Failed to compile TypeScript files!'));
});

gulp.task('test', (done) => {
    banner('Running Karma Tests');

    let server = new karma.Server({
        configFile: path.join(__dirname, 'karma.conf.js'),
        singleRun: true
    }, done);
    server.start();
});

gulp.task('test-watch', (done) => {
    banner('Starting Karma Test Server');

    let server = new karma.Server({
        configFile: path.join(__dirname, 'karma.conf.js')
    }, done);
    server.start();
});

gulp.task('test-coverage', (done) => {
    banner('Running Karma Test Coverage');

    let server = new karma.Server({
        configFile: path.join(__dirname, 'karma.conf.js'),
        reporters: ['mocha', 'coverage'],
        singleRun: true
    }, done);
    server.start();
});

gulp.task('publish', () => {
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
    log('Generating base TypeScript declarations...');
    asPromise(gulp.src('./src/**/*.ts')
        .pipe(ts({
            target: 'ES6',
            declaration: true,
            noExternalResolve: true,
            listFiles: true,
        })).dts
        .pipe(gulp.dest('./build/dts')))
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

/* Helpers */
function log() {
    gutil.log.apply(gutil.log, arguments);
}

function error() {
    let args = Array.prototype.slice.call(arguments, 0).map(arg => gutil.colors.bold.red(arg));
    log.apply(null, args);
}

function asPromise(stream) {
    return new Promise((resolve, reject) => {
        stream
            .on('error', reject)
            .on('end', resolve);
    });
}

function banner(message) {
    log('===========================================================');
    log(message);
    log('===========================================================');
    log('');
}