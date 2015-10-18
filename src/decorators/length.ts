import ValidationManager from '../validation-manager';
import LengthValidator from '../validators/length';

export default function Length(length: number, message?: string): PropertyDecorator {
    return function (targetClass: Object, property: string): void {
        let manager = ValidationManager.get(targetClass);
        manager.addValidator(property, new LengthValidator(length, message));
    };
}