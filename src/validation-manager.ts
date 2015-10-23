import FieldOptions from './field-options';
import BaseValidator from './validators/base-validator';

/**
 * A map from field name to field options.
 */
export type FieldValidations = { [key: string]: FieldOptions }

/**
 * Core class that is responsible for managing validations on class types.
 */
export default class ValidationManager {
    static ValidationsKey: string = '__validations__';

    private fieldValidations: FieldValidations = {};

    /**
     * Gets the validation manager instance for the passed class. If one already exists for that class, it will return
     * the same instance. If one does not exist, a new one will be created.
     * @param targetClass A valid ES6 class or ES5 function constructor.
     * @returns {*|ValidationManager} An instance of ValidationManager tied to the passed class.
     */
    static get(targetClass: any): ValidationManager {
        return targetClass[ValidationManager.ValidationsKey] || (targetClass[ValidationManager.ValidationsKey] = new ValidationManager());
    }

    /**
     * Sets the "friendly" name of the field to be used in validation messages.
     * @param property The property to set the field name for.
     * @param newName The name to set.
     */
    setFieldName(property: string, newName: string): void {
        this.getFieldOptions(property).setFieldName(newName);
    }

    /**
     * Add a validation for the given property to the model.
     * @param property The property to add a validation for.
     * @param validator The validator to add.
     */
    addValidator(property: string, validator: BaseValidator): void {
        this.getFieldOptions(property).addValidator(validator);
    }

    /**
     * Gets all the validations associated with the class type that this ValidationManager is bound to.
     * @returns {FieldValidations} A map of field name to {FieldOptions}.
     */
    getValidations(): FieldValidations {
        return this.fieldValidations;
    }

    /**
     * Gets the field options for the given model property.
     * @param property The property to get field options for.
     * @returns {FieldOptions} An object containing the validators and other options assigned to this field.
     */
    getFieldOptions(property: string): FieldOptions {
        return this.fieldValidations[property] || (this.fieldValidations[property] = new FieldOptions());
    }
}