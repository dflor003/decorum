import BaseValidator from "./base-validator";

export default class CustomValidator<TModel> extends BaseValidator {
    private static CustomValidatorCount = 0;
    private predicate: (value: any, model: TModel) => boolean;

    constructor(predicate: (value: any, model: TModel) => boolean, message: string) {
        super(`customValidator${CustomValidator.CustomValidatorCount++}`, message);
        this.predicate = predicate;
    }

    getMessage(fieldName: string,  fieldValue: any): string {
        return this.getCustomMessage();
    }

    isValid(value: any, model: any): boolean {
        return this.predicate(value, model);
    }
}