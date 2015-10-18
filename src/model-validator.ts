import ValidationManager from './validation-manager';
import FieldOptions from './field-options';
import {FieldValidations} from './validation-manager';

export interface IFieldValidationError {
    field: string;
    fieldName: string;
    errors: string[];
}

export interface IValidationResult {
    isValid: boolean;
    errors: IFieldValidationError[];
}

export default class ModelValidator {
    private validations: FieldValidations;
    private model: any;

    constructor(model: any) {
        if (!model) {
            throw new Error('Validator: No model passed');
        }

        if (!model.constructor) {
            throw new Error('Model has no constructor function');
        }

        if (!model.constructor.prototype) {
            throw new Error('Could not find prototype of model');
        }

        let validationManager = ValidationManager.get(model.constructor.prototype);
        this.validations = validationManager.getValidations();
        this.model = model;
    }

    getValidationOptions(fieldKey: string): FieldOptions {
        let fieldValidations = this.validations[fieldKey];
        if (!fieldValidations) {
            console.warn(`Validation attempted for field ${fieldKey}, but it was not setup`);
            return null;
        }

        return fieldValidations;
    }

    validateField(fieldKey: string, proposedValue?: any): string[] {
        let fieldValidations = this.getValidationOptions(fieldKey);
        if (!fieldValidations) {
            return [];
        }

        let value = arguments.length < 2 ? this.model[fieldKey] : proposedValue;

        return fieldValidations.validateValue(value, this.model);
    }

    validate(): IValidationResult {
        let validations = this.validations,
            result = <IValidationResult>{
                isValid: true,
                errors: []
            };

        for (let fieldKey in validations) {
            if (validations.hasOwnProperty(fieldKey)) {
                let errors = this.validateField(fieldKey);
                if (errors.length) {
                    result.isValid = false;
                    result.errors.push(<IFieldValidationError>{
                        field: fieldKey,
                        fieldName: this.getValidationOptions(fieldKey).getFieldName(),
                        errors: errors
                    });
                }
            }
        }

        return result;
    }
}