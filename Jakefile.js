'use strict';

let path = require('path');
let Promise = require('bluebird')

/* Tasks */
desc('Default task (compiles TS)');
task('default', ['compile']);

desc('Compiles All TypeScript Files');
task('compile', [], () => {
    let projectPath = path.join('.');

    banner('Compiling TypeScript Files');
    compileTypeScript({ tsConfigPath: projectPath })
        .then(() => log('Done compiling TypeScript files!'))
        .catch(() => error('Failed to compile TypeScript files!'))
        .finally(() => complete());
}, { async: true });

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

function compileTypeScript(args) {
    // Error checks
    if (!args) {
        throw new Error('No args passed');
    }
    return run(path.join('node_modules', '.bin', 'tsc'), `--project ${args.tsConfigPath}`);
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