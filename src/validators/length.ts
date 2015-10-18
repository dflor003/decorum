import BaseValidator from './base-validator';

export default class LengthValidator extends BaseValidator {
    private length: number;

    constructor(length: number, message?: string) {
        super('length', message);

        if (typeof length !== 'number' || length <= 0) {
            throw new Error('Length must be a positive integer greater than 0');
        }

        this.length = length;
    }

    getMessage(fieldName: string, fieldValue: any): string {
        return `${fieldName} must be ${this.length} characters long.`;
    }

    isValid(value: any): boolean {
        return value.length === this.length;
    }
}