import BaseValidator from './base-validator';

export default class MaxLengthValidator extends BaseValidator {
    private maxLength: number;

    constructor(maxLength: number, message?: string) {
        super('maxlength', message);

        if (typeof maxLength !== 'number' || maxLength <= 0) {
            throw new Error('Max length must be positive integer greater than 0');
        }

        this.maxLength = maxLength;
    }

    getMessage(fieldName: string, fieldValue: any): string {
        return `${fieldName} can not exceed ${this.maxLength} characters in length`;
    }

    isValid(value: string): boolean {
        return value.length <= this.maxLength;
    }
}