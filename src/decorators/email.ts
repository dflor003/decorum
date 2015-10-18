import EmailValidator from '../validators/email';
import ValidationManager from '../validation-manager';

export default function Email(message?: string): PropertyDecorator {
    return function (targetClass: Object, property: string): void {
        let manager = ValidationManager.get(targetClass);
        manager.addValidator(property, new EmailValidator(message));
    };
}