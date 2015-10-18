import BaseValidator from './base-validator';

export default class RequiredFieldValidator extends BaseValidator {
    constructor(message?: string) {
        super('required', message);
    }

    validatesEmptyValue(): boolean {
        return true;
    }

    getMessage(fieldName: string, fieldValue: any): string {
        return `${fieldName} is required`;
    }

    isValid(value: any): boolean {
        return typeof value === 'string' && !!value.trim();
    }
}