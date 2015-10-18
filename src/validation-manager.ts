import FieldOptions from './field-options';
import BaseValidator from './validators/base-validator';

export type FieldValidations = { [key: string]: FieldOptions }

export default class ValidationManager {
    static ValidationsKey: string = '__validations__';

    private fieldValidations: FieldValidations = {};

    static get(targetClass: any): ValidationManager {
        return targetClass[ValidationManager.ValidationsKey] || (targetClass[ValidationManager.ValidationsKey] = new ValidationManager());
    }

    setFieldName(property: string, newName: string): void {
        this.getFieldOptions(property).setFieldName(newName);
    }

    addValidator(property: string, validator: BaseValidator): void {
        this.getFieldOptions(property).addValidator(validator);
    }

    getValidations(): FieldValidations {
        return this.fieldValidations;
    }

    getFieldOptions(property: string): FieldOptions {
        return this.fieldValidations[property] || (this.fieldValidations[property] = new FieldOptions());
    }
}