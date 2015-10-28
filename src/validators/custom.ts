import BaseValidator from './base-validator';
import {MessageHandler} from '../messages';
import {IMessageOpts} from '../messages';

/**
 * Custom validation class.
 */
export default class CustomValidator<TModel> extends BaseValidator {
    private static CustomValidatorCount = 0;
    private predicate: (value: any, model: TModel) => boolean;

    constructor(predicate: (value: any, model: TModel) => boolean, message: string|MessageHandler<CustomValidator<TModel>>) {
        super(`customValidator${CustomValidator.CustomValidatorCount++}`, message);
        this.predicate = predicate;
    }

    getMessage(opts: IMessageOpts): string {
        return this.getCustomMessage(opts);
    }

    isValid(value: any, model: any): boolean {
        return this.predicate(value, model);
    }
}