import ValidationManager from '../validation-manager';
import Validator from '../validator';

/**
 * Sets the field's "friendly" name in validation error messages.
 * @param name The field's friendly name
 * @returns {function(Object, string): void} A field validation decorator.
 */
export default function FieldName(name: string): PropertyDecorator {
    return function (targetClass: Object, property: string): void {
        let manager = ValidationManager.get(targetClass);
        manager.setFieldName(property, name);
    };
}