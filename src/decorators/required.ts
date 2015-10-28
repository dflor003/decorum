import RequiredFieldValidator from '../validators/required';
import Validator from '../validator';
import {MessageHandler} from '../messages';

/**
 * Marks the field as required.
 * @param message [Optional] Overrides the default validation error message.
 * @returns {function(Object, string): void} A field validation decorator.
 */
export default function Required(message?: string|MessageHandler): PropertyDecorator {
    return function (targetClass: Object, property: string): void {
        Validator.addValidator(targetClass, property, new RequiredFieldValidator(message));
    };
}