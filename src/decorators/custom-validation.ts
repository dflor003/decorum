import CustomValidator from '../validators/custom';
import Validator from '../validator';
import {MessageHandler} from '../messages';

/**
 * A generic custom validation. Takes a predicate that will receive the proposed value as the first parameter and the
 * current model state as the second.
 * @param message The message to display when the predicate fails.
 * @param predicate A lambda expression/function that determines if the value is valid. If it returns a falsy value, the
 * field will be considered invalid and will return the passed error message upon validation.
 * @returns {function(Object, string): void} A field validation decorator.
 */
export default function Validation<TModel>(message: string|MessageHandler<CustomValidator<TModel>>, predicate: (value: any, model: TModel) => boolean): PropertyDecorator {
    return function (targetClass: Object, property: string): void {
        Validator.addValidator(targetClass, property, new CustomValidator(predicate, message));
    };
}