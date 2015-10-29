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
let runSequence = require('run-sequence');
let coveralls = require('gulp-coveralls');
let fs = require('fs');
let replace = require('gulp-replace');
let rename = require('gulp-rename');
let header = require('gulp-header');
let config = require('./bower.json');

/* Config */
let appVersion = config.version.replace('-alpha', '');

/* Tasks */
gulp.task('default', (done) => {
    return runSequence(
        'build',
        'test',
        done
    );
});

gulp.task('ci', (done) => {
    return runSequence(
        'build',
        'test-coverage',
        'publish-test-coverage',
        done
    );
});

gulp.task('build', () => {
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

gulp.task('publish-test-coverage', ['test-coverage'], () => {
    gulp.src('./coverage/**/lcov.info')
        .pipe(coveralls());
});

gulp.task('publish', () => {
    var bundledFileName = 'decorum.js',
        sourceMapFileName = './dist/' + bundledFileName + '.map',
        globalNamespace = 'decorum';

    let bundle = browserify({
            entries: './src/main.ts',
            debug: true,
            standalone: globalNamespace
        })
        .plugin(tsify, { module: 'umd', target: 'es5', sourceMap: true })
        .bundle()
        .pipe(exorcist(sourceMapFileName))
        .pipe(source(bundledFileName))
        .pipe(gulp.dest('./dist'));

    let banner = `
/*!
 * ${config.name} - ${config.version}
 *
 * ${config.description}
 *
 * Copyright 2015 Danil Flores
 *
 * @version v${config.version}
 * @link ${config.homepage}
 * @license ${config.license}
 */
`;

    return asPromise(bundle)
        .then((x) => {
            return gulp.src('./dist/' + bundledFileName)
                .pipe(header(banner.trim() + '\n\n'))
                .pipe(gulp.dest('./dist'));
        })
        .catch(err => error(err));
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
        .pipe(gulp.dest('./build/temp/dts')))
        .then(() => {
            log('Bundling TypeScript declarations...');
            dts.bundle({
                name: 'decorum',
                main: './build/temp/dts/main.d.ts',
                out: '../decorum_temp.d.ts'
            });

            let typedefHeader = `
// Type definitions for Decorum JS v${appVersion}
// Project: https://github.com/dflor003/decorum
// Definitions by: Danil Flores <https://github.com/dflor003>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module 'decorum' {
    export = decorum;
}

declare namespace decorum {
`;

            gulp.src('./build/temp/decorum_temp.d.ts')
                .pipe(replace(/\r\n/gi, '\n'))
                .pipe(replace(/^\s*export\s*\{\s*default.*\n/gmi, ''))
                .pipe(replace(/^\s*import.*\n/gmi, ''))
                .pipe(replace(/^\s*declare module.*\n/gmi, ''))
                .pipe(replace(/^}\s*\n/gmi, ''))
                .pipe(replace(/export default/gmi, 'export'))
                .pipe(replace(/^\s*export let .*\n/gmi, ''))
                .pipe(replace(/^\s*export [a-z0-9_@$]+;\n/gmi, ''))
                .pipe(replace(/(\s+)let ([a-z0-9_@$]+:)/gmi, '$1export let $2'))
                .pipe(replace(/abstract class ([a-z0-9_@$]+\s*\{)/gmi, 'export abstract class $1'))
                .pipe(replace(/([;}])\n([ ]+\/\*\*\n)/gmi, '$1\n\n$2'))
                .pipe(replace(/^\/\/ Generated by.*\n/gmi, typedefHeader.trim() + '\n'))
                .pipe(replace(/\n$/, '\n}\n'))
                .pipe(replace(/\n/g, '\r\n'))
                .pipe(rename('decorum.d.ts'))
                .pipe(gulp.dest('./build/typings'));
        })
        .then(() => {
            log('Deleting temp declaration files...');
            del('./build/temp');
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