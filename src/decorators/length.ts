import ValidationManager from '../validation-manager';
import LengthValidator from '../validators/length';

/**
 * Validate's a field's EXACT length. Validation fails if the field is not EXACTLY the length passed.
 * @param length The exact length the field must be.
 * @param message [Optional] Overrides the default validation error message.
 * @returns {function(Object, string): void} A field validation decorator.
 */
export default function Length(length: number, message?: string): PropertyDecorator {
    return function (targetClass: Object, property: string): void {
        let manager = ValidationManager.get(targetClass);
        manager.addValidator(property, new LengthValidator(length, message));
    };
}