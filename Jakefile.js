'use strict';

let path = require('path');
let Promise = require('bluebird');

/* Tasks */
desc('Default task (compiles TS)');
task('default', ['compile']);

desc('Compiles All TypeScript Files');
task('compile', [], () => {
    let projectPath = path.join('.');

    banner('Compiling TypeScript Files');
    compileTypeScript({tsConfigPath: projectPath})
        .then(() => log('Done compiling TypeScript files!'))
        .catch(() => error('Failed to compile TypeScript files!'))
        .finally(() => complete());
}, {async: true});

desc('Runs Karma test runner once and reports to command line');
task('test', [], () => {
    let args = {
        watch: false,
        browsers: [], // Use defaults from karma.conf.js
        coverage: false,
    };

    banner('Starting Karma Test Runner')
    karma(args)
        .then(() => log('Karma tests finished!'))
        .catch((err) => error(`Error occurred running Karma:\n${err}`))
        .finally(() => complete());
}, {async: true});

desc('Runs Karma test runner in "watch" mode. Will automatically re-run tests when a file changes.');
task('test-watch', [], () => {
    let args = {
        watch: true,
        browsers: [], // Use defaults from karma.conf.js
        coverage: false,
    };

    banner('Starting Karma Test Runner')
    karma(args)
        .then(() => log('Karma tests finished!'))
        .catch((err) => error(`Error occurred running Karma:\n${err}`))
        .finally(() => complete());
}, {async: true});

desc('Runs Karma to generate test coverage reports under the ./coverage folder');
task('test-coverage', [], () => {
    let args = {
        watch: false,
        browsers: [], // Use defaults from karma.conf.js
        coverage: true,
    };

    banner('Starting Karma Test Runner')
    karma(args)
        .then(() => log('Karma tests finished!'))
        .catch((err) => error(`Error occurred running Karma:\n${err}`))
        .finally(() => complete());
}, {async: true});

/* Helpers */
function log() {
    jake.logger.log.apply(jake.logger, arguments);
}

function banner(message) {
    log('\n===========================================================');
    log(message);
    log('===========================================================\n');
}

function error() {
    jake.logger.error.apply(jake.logger, arguments);
}

function karma(args) {
    args = args || {};
    let watch = typeof args.watch === 'boolean' ? args.watch : true;
    let browsers = args.browsers || [];
    let coverage = typeof args.coverage === 'boolean' ? args.coverage : false;

    let karmaPath = path.join('karma');
    let cmdParams = [];

    if (watch === false || coverage === true) {
        cmdParams.push('--single-run');
    }

    if (browsers && browsers.length) {
        cmdParams.push(`--browsers ${browsers.join(',')}`);
    }

    if (coverage === true) {
        cmdParams.push('--reporters mocha,coverage');
    }

    return run.apply(null, [karmaPath, 'start'].concat(cmdParams));
}

function compileTypeScript(args) {
    // Error checks
    if (!args) {
        throw new Error('No args passed');
    }

    var tsc = path.join('node_modules', '.bin', 'tsc');
    return run(tsc, `--project ${args.tsConfigPath}`);
}

function run(cmd) {
    let args = arguments && arguments.length > 1
        ? Array.prototype.slice.call(arguments, 1)
        : [];

    return new Promise((resolve, reject) => {
        let command = [cmd].concat(args).join(' '), exec = jake.createExec([command]);
        exec
            .addListener('stdout', (output) => process.stdout.write(output))
            .addListener('stderr', (output) => process.stderr.write(output))
            .addListener('cmdEnd', () => resolve(undefined))
            .addListener('error', (error) => reject(error));
        exec.run();
    });
}