import RequiredFieldValidator from '../validators/required';
import ValidationManager from '../validation-manager';
import Validator from '../validator';

/**
 * Marks the field as required.
 * @param message [Optional] Overrides the default validation error message.
 * @returns {function(Object, string): void} A field validation decorator.
 */
export default function Required(message?: string): PropertyDecorator {
    return function (targetClass: Object, property: string): void {
        Validator.addValidator(targetClass, property, new RequiredFieldValidator(message));
    };
}