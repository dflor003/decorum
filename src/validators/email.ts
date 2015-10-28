import PatternValidator from './pattern';
import MessageHandlerMap from '../messages';
import {MessageHandler} from '../messages';

MessageHandlerMap['email'] = (fieldName: string,  fieldValue: any) => `${fieldName} is not a valid email address`;

/**
 * An email validator.
 */
export default class EmailValidator extends PatternValidator {
    static EmailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;

    constructor(message?: string|MessageHandler) {
        super(EmailValidator.EmailRegex, message);
    }

    getMessage(fieldName: string, fieldValue: any): string {
        return MessageHandlerMap['email'](fieldName, fieldValue);
    }

    getKey(): string {
        return 'email';
    }
}