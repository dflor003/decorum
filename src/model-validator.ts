import ValidationManager from "./validation-manager";
import FieldOptions from "./field-options";
import {FieldValidations} from "./validation-manager";

export default class Validator {
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

        var validationManager = ValidationManager.get(model.constructor.prototype);
        this.validations = validationManager.getValidations();
        this.model = model;
    }

    getValidationOptions(fieldKey: string): FieldOptions {
        var fieldValidations = this.validations[fieldKey];
        if (!fieldValidations) {
            console.warn(`Validation attempted for field ${fieldKey}, but it was not setup`);
            return null;
        }

        return fieldValidations;
    }

    getValidationErrors(fieldKey: string, value: any): string[] {
        var fieldValidations = this.getValidationOptions(fieldKey);
        if (!fieldValidations) {
            return [];
        }

        return fieldValidations.validateValue(value, this.model);
    }
}