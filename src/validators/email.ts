import PatternValidator from './pattern';
import MessageHandlerMap from '../messages';
import {MessageHandler} from '../messages';
import {IMessageOpts} from '../messages';

MessageHandlerMap['email'] = (opts: IMessageOpts) => `${opts.friendlyName} is not a valid email address`;

/**
 * An email validator.
 */
export default class EmailValidator extends PatternValidator {
    static EmailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;

    constructor(message?: string|MessageHandler<EmailValidator>) {
        super(EmailValidator.EmailRegex, message);
    }

    getMessage(opts: IMessageOpts): string {
        return MessageHandlerMap['email'](opts, this);
    }

    getKey(): string {
        return 'email';
    }
}