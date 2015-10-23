import BaseValidator from './base-validator';
import MessageHandlerMap from '../messages';

MessageHandlerMap['maxlength'] =
    (fieldName: string, fieldValue: any, maxLength: number) =>
        `${fieldName} can not exceed ${maxLength} characters in length`;

/**
 * A maximum length validator.
 */
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
        return MessageHandlerMap['maxlength'](fieldName, fieldValue, this.maxLength);
    }

    isValid(value: string): boolean {
        return value.length <= this.maxLength;
    }
}