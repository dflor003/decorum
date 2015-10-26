import ModelValidator from './model-validator';
import {IValidationResult} from './model-validator';
import BaseValidator from './validators/base-validator';
import ValidationManager from './validation-manager';

/**
 * A map from field name to array of field validation decorators.
 */
export type ValidationDefinitions = { [field: string]: PropertyDecorator[]; }

/**
 * Static container for convenience methods related to field validation.
 */
export default class Validator {

    /**
     * Creates a new model validator for the given model. Model should be a valid class that has a valid constructor
     * and a prototype.
     * @param model The model to create the validator for.
     * @returns {ModelValidator} An instance of {ModelValidator}
     */
    static new(model: any): ModelValidator {
        return new ModelValidator(model);
    }

    /**
     * Decorates the passed class with model validations. Use this when you do not have access to ES7 decorators.
     * The object passed should be a valid class (ES6 class or ES5 function constructor).
     * @param objectType The class to decorate.
     * @param definitions One or more field validation definitions of the form { "fieldName": [ decorators ] }.
     */
    static decorate(objectType: any, definitions: ValidationDefinitions): void {
        if (!objectType) {
            throw new Error('Validator.decorate: No class passed!');
        }

        if (!objectType.prototype) {
            throw new Error('Validator.decorate: First parameter must be a valid class with a prototype!');
        }

        if (!definitions) {
            throw new Error('Validator.decorate: Definitions must be a valid map of field name to validator values');
        }

        let prototype = objectType.prototype;
        for (let field in definitions) {
            if (!definitions.hasOwnProperty(field)) {
                continue;
            }

            let decorators = definitions[field];
            for (let i = 0; i < decorators.length; i++) {
                let decorator = decorators[i];
                decorator(prototype, field);
            }
        }
    }

    /**
     * Creates an anonymous validator, immediately validates the model, and returns any validation errors on the model
     * as a result.
     * @param model The model to validate.
     */
    static validate(model: any): IValidationResult {
        return new ModelValidator(model).validate();
    }

    /**
     * Adds a validator to the given object prototype for the given property. Meant to be used inside of validation
     * decorators to inject the validation onto the object property.
     * @param targetPrototype A valid object prototype to add to.
     * @param property The property to add the validator for.
     * @param validator The validator to add.
     */
    static addValidator(targetPrototype: Object, property: string, validator: BaseValidator): void {
        let manager = ValidationManager.get(targetPrototype);
        manager.addValidator(property, validator);
    }
}