import Pattern from './pattern';
import MessageHandlers from '../messages';
import {MessageHandler, IMessageOpts} from '../messages';
import PatternValidator from '../validators/pattern';

MessageHandlers['alpha'] = (opts: IMessageOpts) => `${opts.friendlyName} must only contain alphabetic characters`;

/**
 * Validates that a given field only contains alpha values.
 * @param message [Optional] Overrides the default validation error message.
 * @returns {function(Object, string): void} A field validation decorator.
 */
export default function Alpha(message?: string|MessageHandler<PatternValidator>): PropertyDecorator {
    return Pattern(/^[a-z]+$/i, message || MessageHandlers['alpha']);
}