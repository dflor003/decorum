import BaseValidator from './base-validator';
import MessageHandlerMap from '../messages';
import {MessageHandler} from '../messages';

MessageHandlerMap['length'] =
    (fieldName: string, fieldValue: any, length: number) =>
        `${fieldName} must be ${length} characters long.`;

/**
 * An exact length validator.
 */
export default class LengthValidator extends BaseValidator {
    private length: number;

    constructor(length: number, message?: string|MessageHandler) {
        super('length', message);

        if (typeof length !== 'number' || length <= 0) {
            throw new Error('Length must be a positive integer greater than 0');
        }

        this.length = length;
    }

    getMessage(fieldName: string, fieldValue: any): string {
        return MessageHandlerMap['length'](fieldName,  fieldValue, this.length);
    }

    isValid(value: any): boolean {
        return value.length === this.length;
    }
}