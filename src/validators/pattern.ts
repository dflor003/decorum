import BaseValidator from './base-validator';

export default class PatternValidator extends BaseValidator {
    private pattern: RegExp;

    constructor(pattern: RegExp, message?: string) {
        super('pattern', message);
        this.pattern = pattern;
    }

    getMessage(fieldName: string, fieldValue: any): string {
        return `${fieldName} is not valid`;
    }

    isValid(value: any): boolean {
        if (typeof value !== 'string' || !value.length) {
            return true;
        }

        return this.pattern.test(value);
    }
}