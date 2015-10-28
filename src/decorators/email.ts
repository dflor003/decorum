import EmailValidator from '../validators/email';
import Validator from '../validator';
import {MessageHandler} from '../messages';

/**
 * Validate's that the field is a valid email address. The format used is the same as the webkit browser's internal
 * email validation format. For looser or stricter formats, use your own validation based on the @Pattern decorator.
 * @param message [Optional] Overrides the default validation error message.
 * @returns {function(Object, string): void} A field validation decorator.
 */
export default function Email(message?: string|MessageHandler<EmailValidator>): PropertyDecorator {
    return function (targetClass: Object, property: string): void {
        Validator.addValidator(targetClass, property, new EmailValidator(message));
    };
}