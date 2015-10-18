import ModelValidator from './model-validator';
import {IValidationResult} from './model-validator';

export type ValidationDefinitions = { [field: string]: PropertyDecorator[]; }

export default class Validator {
    static new(model: any): ModelValidator {
        return new ModelValidator(model);
    }

    static setValidations(objectType: any, definitions: ValidationDefinitions): void {
        if (!objectType) {
            throw new Error('Validator.setValidations: No class passed!');
        }

        if (!objectType.prototype) {
            throw new Error('Validator.setValidations: First parameter must be a valid class with a prototype!');
        }

        if (!definitions) {
            throw new Error('Validator.setValidations: Definitions must be a valid map of field name to validator values');
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

    static validate(model: any): IValidationResult {
        return new ModelValidator(model).validate();
    }
}