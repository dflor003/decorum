import BaseValidator from './base-validator';
import MessageHandlerMap from '../messages';
import {MessageHandler} from '../messages';
import {IMessageOpts} from "../messages";

MessageHandlerMap['minlength'] =
    (opts: IMessageOpts, validator: MinLengthValidator) =>
        `${opts.friendlyName} must be at least ${validator.minLength} characters long`;

/**
 * A minimum length validator.
 */
export default class MinLengthValidator extends BaseValidator {
    minLength: number;

    constructor(minLength: number, message?: string|MessageHandler<MinLengthValidator>) {
        super('minlength', message);

        if (typeof minLength !== 'number' || minLength <= 0) {
            throw new Error('Min length must be positive integer greater than 0');
        }

        this.minLength = minLength;
    }

    getMessage(opts: IMessageOpts): string {
        return MessageHandlerMap['minlength'](opts, this);
    }

    isValid(value: string): boolean {
        return value.length >= this.minLength;
    }
}