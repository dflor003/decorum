import ValidationManager from '../validation-manager';
import MaxLengthValidator from '../validators/max-length';

/**
 * Validates a field's maximum length.
 * @param maxLength The field's maximum length. Must be a positive integer greater than 1.
 * @param message [Optional] Overrides the default validation error message.
 * @returns {function(Object, string): void} A field validation decorator.
 */
export default function MaxLength(maxLength: number, message?: string): PropertyDecorator {
    return function (targetClass: Object, property: string): void {
        let manager = ValidationManager.get(targetClass);
        manager.addValidator(property, new MaxLengthValidator(maxLength, message));
    };
}