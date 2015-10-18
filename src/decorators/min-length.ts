import ValidationManager from '../validation-manager';
import MinLengthValidator from '../validators/min-length';

export default function MinLength(minLength: number, message?: string): PropertyDecorator {
    return function (targetClass: Object, property: string): void {
        let manager = ValidationManager.get(targetClass);
        manager.addValidator(property, new MinLengthValidator(minLength, message));
    };
}