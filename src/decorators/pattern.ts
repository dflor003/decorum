import ValidationManager from "../validation-manager";
import PatternValidator from "../validators/pattern";

export default function Pattern(regex: RegExp, message?: string): PropertyDecorator {
    return function (targetClass: Object, property: string) {
        var manager = ValidationManager.get(targetClass);
        manager.addValidator(property, new PatternValidator(regex,  message));
    }
}