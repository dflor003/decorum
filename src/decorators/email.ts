import EmailValidator from '../validators/email';
import ValidationManager from '../validation-manager';

/**
 * Validate's that the field is a valid email address. The format used is the same as the webkit browser's internal
 * email validation format. For looser or stricter formats, use your own validation based on the @Pattern decorator.
 * @param message [Optional] Overrides the default validation error message.
 * @returns {function(Object, string): void} A field validation decorator.
 */
export default function Email(message?: string): PropertyDecorator {
    return function (targetClass: Object, property: string): void {
        let manager = ValidationManager.get(targetClass);
        manager.addValidator(property, new EmailValidator(message));
    };
}