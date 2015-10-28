import Pattern from './pattern';
import MessageHandlers from '../messages';
import {MessageHandler, IMessageOpts} from '../messages';
import PatternValidator from '../validators/pattern';

MessageHandlers['alphanumeric'] = (opts: IMessageOpts) => `${opts.friendlyName} must only contain alphanumeric characters`;

/**
 * Validates that a given field only contains alphanumeric values.
 * @param message [Optional] Overrides the default validation error message.
 * @returns {function(Object, string): void} A field validation decorator.
 */
export default function AlphaNumeric(message?: string|MessageHandler<PatternValidator>): PropertyDecorator {
    return Pattern(/^[a-z0-9]+$/i, message || MessageHandlers['alphanumeric'])
}