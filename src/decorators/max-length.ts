import ValidationManager from '../validation-manager';
import MaxLengthValidator from '../validators/max-length';

export default function MaxLength(maxLength: number, message?: string): PropertyDecorator {
    return function (targetClass: Object, property: string): void {
        let manager = ValidationManager.get(targetClass);
        manager.addValidator(property, new MaxLengthValidator(maxLength, message));
    };
}