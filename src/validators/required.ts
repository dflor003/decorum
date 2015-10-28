import BaseValidator from './base-validator';
import MessageHandlerMap from '../messages';
import {MessageHandler} from '../messages';
import {IMessageOpts} from '../messages';

MessageHandlerMap['required'] =
    (opts: IMessageOpts) =>
        `${opts.friendlyName} is required`;

/**
 * A field requiredness validator.
 */
export default class RequiredFieldValidator extends BaseValidator {
    constructor(message?: string|MessageHandler<RequiredFieldValidator>) {
        super('required', message);
    }

    validatesEmptyValue(): boolean {
        return true;
    }

    getMessage(opts: IMessageOpts): string {
        return MessageHandlerMap['required'](opts, this);
    }

    isValid(value: any): boolean {
        return typeof value === 'string' && !!value.trim();
    }
}