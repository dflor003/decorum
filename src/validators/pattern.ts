import BaseValidator from './base-validator';
import MessageHandlerMap from '../messages';
import {MessageHandler} from '../messages';
import {IMessageOpts} from '../messages';

MessageHandlerMap['pattern'] =
    (opts: IMessageOpts) =>
        `${opts.friendlyName} is not valid`;

/**
 * A regular expression validator.
 */
export default class PatternValidator extends BaseValidator {
    pattern: RegExp;

    constructor(pattern: RegExp, message?: string|MessageHandler<PatternValidator>) {
        super('pattern', message);
        this.pattern = pattern;
    }

    getMessage(opts: IMessageOpts): string {
        return MessageHandlerMap['pattern'](opts, this);
    }

    isValid(value: any): boolean {
        return this.pattern.test(value);
    }
}