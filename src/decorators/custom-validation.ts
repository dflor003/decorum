import ValidationManager from '../validation-manager';
import CustomValidator from '../validators/custom';

/**
 * A generic custom validation. Takes a predicate that will receive the proposed value as the first parameter and the
 * current model state as the second.
 * @param message The message to display when the predicate fails.
 * @param predicate A lambda expression/function that determines if the value is valid. If it returns a falsy value, the
 * field will be considered invalid and will return the passed error message upon validation.
 * @returns {function(Object, string): void} A field validation decorator.
 */
export default function Validation<TModel>(message: string, predicate: (value: any, model: TModel) => boolean): PropertyDecorator {
    return function (targetClass: Object, property: string): void {
        let manager = ValidationManager.get(targetClass);
        manager.addValidator(property, new CustomValidator(predicate, message));
    };
}