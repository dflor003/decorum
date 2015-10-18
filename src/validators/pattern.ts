import BaseValidator from './base-validator';
import MessageHandlerMap from '../messages';

MessageHandlerMap['pattern'] =
    (fieldName: string, fieldValue: any, regex: RegExp) =>
        `${fieldName} is not valid`;

export default class PatternValidator extends BaseValidator {
    private pattern: RegExp;

    constructor(pattern: RegExp, message?: string) {
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