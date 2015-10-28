import BaseValidator from './base-validator';
import MessageHandlerMap from '../messages';
import {MessageHandler} from '../messages';
import {IMessageOpts} from '../messages';

MessageHandlerMap['maxlength'] =
    (opts: IMessageOpts, validator: MaxLengthValidator) =>
        `${opts.friendlyName} can not exceed ${validator.maxLength} characters in length`;

/**
 * A maximum length validator.
 */
export default class MaxLengthValidator extends BaseValidator {
    maxLength: number;

    constructor(maxLength: number, message?: string|MessageHandler<MaxLengthValidator>) {
        super('maxlength', message);

        if (typeof maxLength !== 'number' || maxLength <= 0) {
            throw new Error('Max length must be positive integer greater than 0');
        }

        this.maxLength = maxLength;
    }

    getMessage(opts: IMessageOpts): string {
        return MessageHandlerMap['maxlength'](opts, this);
    }

    isValid(value: string): boolean {
        return value.length <= this.maxLength;
    }
}