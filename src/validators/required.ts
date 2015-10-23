import BaseValidator from './base-validator';
import MessageHandlerMap from '../messages';

MessageHandlerMap['required'] =
    (fieldName: string, fieldValue: any) =>
        `${fieldName} is required`;

/**
 * A field requiredness validator.
 */
export default class RequiredFieldValidator extends BaseValidator {
    constructor(message?: string) {
        super('required', message);
    }

    validatesEmptyValue(): boolean {
        return true;
    }

    getMessage(fieldName: string, fieldValue: any): string {
        return MessageHandlerMap['required'](fieldName, fieldValue);
    }

    isValid(value: any): boolean {
        return typeof value === 'string' && !!value.trim();
    }
}