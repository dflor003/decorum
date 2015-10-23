import BaseValidator from './validators/base-validator';

/**
 * Validation options for a given field including actual validators and meta data such as the field name.
 */
export default class FieldOptions {
    private fieldName: string = 'Field';
    private validators: BaseValidator[] = [];

    /**
     * Gets the "friendly" name of the field for use in validation error messages. Defaults to just "Field".
     * @returns {string}
     */
    getFieldName(): string {
        return this.fieldName;
    }

    /**
     * Sets the "friendly" name of the field for use in validation error messages. This name will be used in the text
     * of validation errors.
     * @param name The new name to set.
     */
    setFieldName(name: string): void {
        this.fieldName = name;
    }

    /**
     * Add a validator to the list of validators for this field.
     * @param validator The validator to add. Should be a class that extends from {BaseValidator}.
     */
    addValidator(validator: BaseValidator): void {
        this.validators.push(validator);
    }

    /**
     * Gets the validators assigned to this field.
     * @returns {BaseValidator[]} The validators for this field.
     */
    getValidators(): BaseValidator[] {
        return this.validators;
    }

    /**
     * Runs through all of the validators for the field given a particular value and returns any validation errors that
     * may have occurred.
     * @param value The value to validate.
     * @param model The rest of the model. Used in custom cross-field validations.
     * @returns {string[]} Any validation errors that may have occurred or an empty array if the value passed is valid
     * for the field.
     */
    validateValue(value: any, model: any): string[] {
        let errors: string[] = [],
            fieldName = this.fieldName,
            isEmpty = !value;

        for (let i = 0; i < this.validators.length; i++) {
            let validator = this.validators[i];

            if (!validator.validatesEmptyValue() && isEmpty) {
                continue;
            }

            if (!validator.isValid(value, model)) {
                let message = validator.hasCustomMessage
                    ? validator.getCustomMessage()
                    : validator.getMessage(fieldName, value);
                errors.push(message);
            }
        }

        return errors;
    }
}
