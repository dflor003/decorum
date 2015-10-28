import BaseValidator from './base-validator';
import {MessageHandler} from '../messages';

/**
 * Custom validation class.
 */
export default class CustomValidator<TModel> extends BaseValidator {
    private static CustomValidatorCount = 0;
    private predicate: (value: any, model: TModel) => boolean;

    constructor(predicate: (value: any, model: TModel) => boolean, message: string|MessageHandler) {
        super(`customValidator${CustomValidator.CustomValidatorCount++}`, message);
        this.predicate = predicate;
    }

    getMessage(fieldName: string,  fieldValue: any): string {
        return this.getCustomMessage(fieldName, fieldValue);
    }

    isValid(value: any, model: any): boolean {
        return this.predicate(value, model);
    }
}