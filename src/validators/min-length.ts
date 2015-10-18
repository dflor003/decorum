import BaseValidator from './base-validator';
import MessageHandlerMap from '../messages';

MessageHandlerMap['minlength'] =
    (fieldName: string, fieldValue: any, minLength: number) =>
        `${fieldName} must be at least ${minLength} characters long`;

export default class MinLengthValidator extends BaseValidator {
    private minLength: number;

    constructor(minLength: number, message?: string) {
        super('minlength', message);

        if (typeof minLength !== 'number' || minLength <= 0) {
            throw new Error('Min length must be positive integer greater than 0');
        }

        this.minLength = minLength;
    }

    getMessage(fieldName: string, fieldValue: any): string {
        return MessageHandlerMap['minlength'](fieldName,  fieldValue, this.minLength);
    }

    isValid(value: string): boolean {
        return value.length >= this.minLength;
    }
}