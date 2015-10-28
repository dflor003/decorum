import BaseValidator from './base-validator';
import MessageHandlerMap from '../messages';
import {MessageHandler} from '../messages';
import {IMessageOpts} from '../messages';

MessageHandlerMap['length'] =
    (opts: IMessageOpts, validator: LengthValidator) =>
        `${opts.friendlyName} must be ${validator.length} characters long.`;

/**
 * An exact length validator.
 */
export default class LengthValidator extends BaseValidator {
    length: number;

    constructor(length: number, message?: string|MessageHandler<LengthValidator>) {
        super('length', message);

        if (typeof length !== 'number' || length <= 0) {
            throw new Error('Length must be a positive integer greater than 0');
        }

        this.length = length;
    }

    getMessage(opts: IMessageOpts): string {
        return MessageHandlerMap['length'](opts, this);
    }

    isValid(value: any): boolean {
        return value.length === this.length;
    }
}