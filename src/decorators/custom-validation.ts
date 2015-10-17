import ValidationManager from "../validation-manager";
import CustomValidator from "../validators/custom";

export default function Validation<TModel>(message: string, predicate: (value: any, model: TModel) => boolean): PropertyDecorator {
    return function (targetClass: Object, property: string) {
        var manager = ValidationManager.get(targetClass);
        manager.addValidator(property, new CustomValidator(predicate, message));
    }
}