import BaseValidator from './base-validator';
import MessageHandlerMap from '../messages';
import {MessageHandler} from '../messages';

MessageHandlerMap['pattern'] =
    (fieldName: string, fieldValue: any, regex: RegExp) =>
        `${fieldName} is not valid`;

/**
 * A regular expression validator.
 */
export default class PatternValidator extends BaseValidator {
    private pattern: RegExp;

    constructor(pattern: RegExp, message?: string|MessageHandler) {
        super('pattern', message);
        this.pattern = pattern;
    }

    getMessage(fieldName: string, fieldValue: any): string {
        return MessageHandlerMap['pattern'](fieldName, fieldValue, this.pattern);
    }

    isValid(value: any): boolean {
        return this.pattern.test(value);
    }
}