import BaseValidator from "./validators/base-validator";

export default class FieldOptions {
    private fieldName: string = 'Field';
    private validators: BaseValidator[] = [];

    constructor() {
    }

    getFieldName(): string {
        return this.fieldName;
    }

    setFieldName(name: string): void {
        this.fieldName = name;
    }

    addValidator(validator: BaseValidator): void {
        this.validators.push(validator);
    }

    getValidators(): BaseValidator[] {
        return this.validators;
    }

    validateValue(value: any, model: any): string[] {
        var errors: string[] = [],
            fieldName = this.fieldName;
        for(var validator of this.validators) {
            if (!validator.isValid(value, model)) {
                let message = validator.getMessage(fieldName, value);
                errors.push(message);
            }
        }

        return errors;
    }
}
