import BaseValidator from "./base-validator";

export default class LengthValidator extends BaseValidator {
    private minLength: number;
    private maxLength: number;

    constructor(minLength: number, maxLength: number, message?: string) {
        super('length', message);

        if (minLength < 0) {
            throw new Error('Min length must be positive integer');
        }

        if (maxLength < 0) {
            throw new Error('Max length must be positive integer');
        }

        if (!minLength && !maxLength) {
            throw new Error('Must specify at least one of min or max length');
        }

        this.minLength = minLength;
        this.maxLength = maxLength;
    }

    getMessage(fieldName: string, fieldValue: any): string {
        if (this.minLength && this.maxLength) {
            return `${fieldName} must be between ${this.minLength} and ${this.maxLength} characters long`;
        }

        if (this.maxLength) {
            return `${fieldName} can not exceed ${this.maxLength} characters in length`;
        }

        if (this.minLength) {
            return `${fieldName} must be at least ${this.minLength} characters long`;
        }
    }

    isValid(value: any): boolean {
        if (typeof value !== 'string') {
            return false;
        }

        if (this.maxLength && value.length > this.maxLength) {
            return false;
        }

        return !(this.minLength && value.length < this.minLength);
    }
}