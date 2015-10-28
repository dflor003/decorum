import PatternValidator from '../validators/pattern';
import Validator from '../validator';
import {MessageHandler} from '../messages';

/**
 * Validates the field against a regular expression pattern.
 * @param regex The regex to validate against. Should be a valid JavaScript {RegExp} instance.
 * @param message [Optional] Overrides the default validation error message.
 * @returns {function(Object, string): void} A field validation decorator.
 */
export default function Pattern(regex: RegExp, message?: string|MessageHandler<PatternValidator>): PropertyDecorator {
    return function (targetClass: Object, property: string): void {
        Validator.addValidator(targetClass, property, new PatternValidator(regex,  message));
    };
}