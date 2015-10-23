import ValidationManager from './validation-manager';
import FieldOptions from './field-options';
import {FieldValidations} from './validation-manager';

/**
 * Details about validation errors on a field.
 */
export interface IFieldValidationError {
    /**
     * The property name of the field on the model.
     */
    field: string;

    /**
     * The "friendly" name of the field. If not set on the model via @FieldName(...), it will default to "Field".
     */
    fieldName: string;

    /**
     * One or more field validation errors. Empty if no errors.
     */
    errors: string[];
}

/**
 * Result returned when a model is validated.
 */
export interface IValidationResult {
    /**
     * Whether or not the model is valid.
     */
    isValid: boolean;

    /**
     * A map of field name to validation errors.
     */
    errors: IFieldValidationError[];
}

/**
 * Wraps a model to allow the consuming class to call validation methods.
 */
export default class ModelValidator {
    private validations: FieldValidations;
    private model: any;

    /**
     * Creates a new model validator.
     * @param model The model to validate. Should be a class that has a valid constructor function and prototype.
     */
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

    /**
     * Gets the validation options for the given field name.
     * @param fieldKey         The name of the field to get options for.
     * @returns {FieldOptions} The field options associated with that field or null if no validations defined
     * for the field.
     */
    getValidationOptions(fieldKey: string): FieldOptions {
        let fieldValidations = this.validations[fieldKey];
        if (!fieldValidations) {
            console.warn(`Validation attempted for field ${fieldKey}, but it was not setup`);
            return null;
        }

        return fieldValidations;
    }

    /**
     * Validates the given field on this {ModelValidator}'s model. If a proposed value is passed, validate
     * against that passed value; otherwise, use the field's current value on the model.
     * @param fieldKey      The name of the field to validate.
     * @param proposedValue [Optional] The proposed value to set on the field.
     * @returns {string[]}  An array of field validation error messages if the field is invalid; otherwise,
     * an empty array.
     */
    validateField(fieldKey: string, proposedValue?: any): string[] {
        let fieldValidations = this.getValidationOptions(fieldKey);
        if (!fieldValidations) {
            return [];
        }

        let value = arguments.length < 2 ? this.model[fieldKey] : proposedValue;

        return fieldValidations.validateValue(value, this.model);
    }

    /**
     * Validate the entire model and return a result that indicates whether the model is valid or not and any errors
     * that have occurred in an object indexed by field name on the model.
     * @returns {IValidationResult} An object that contains whether the model is valid or not and errors by field name.
     */
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