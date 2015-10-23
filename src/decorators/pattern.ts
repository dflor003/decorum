import ValidationManager from '../validation-manager';
import PatternValidator from '../validators/pattern';

/**
 * Validates the field against a regular expression pattern.
 * @param regex The regex to validate against. Should be a valid JavaScript {RegExp} instance.
 * @param message [Optional] Overrides the default validation error message.
 * @returns {function(Object, string): void} A field validation decorator.
 */
export default function Pattern(regex: RegExp, message?: string): PropertyDecorator {
    return function (targetClass: Object, property: string): void {
        let manager = ValidationManager.get(targetClass);
        manager.addValidator(property, new PatternValidator(regex,  message));
    };
}