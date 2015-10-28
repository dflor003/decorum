import LengthValidator from '../validators/length';
import Validator from '../validator';
import {MessageHandler} from '../messages';

/**
 * Validate's a field's EXACT length. Validation fails if the field is not EXACTLY the length passed.
 * @param length The exact length the field must be.
 * @param message [Optional] Overrides the default validation error message.
 * @returns {function(Object, string): void} A field validation decorator.
 */
export default function Length(length: number, message?: string|MessageHandler): PropertyDecorator {
    return function (targetClass: Object, property: string): void {
        Validator.addValidator(targetClass, property, new LengthValidator(length, message));
    };
}