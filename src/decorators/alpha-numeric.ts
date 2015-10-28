import Pattern from './pattern';
import MessageHandlers from '../messages';
import {MessageHandler} from '../messages';

MessageHandlers['alphanumeric'] = (fieldName: string) => `${fieldName} must only contain alphanumeric characters`;

/**
 * Validates that a given field only contains alphanumeric values.
 * @param message [Optional] Overrides the default validation error message.
 * @returns {function(Object, string): void} A field validation decorator.
 */
export default function AlphaNumeric(message?: string|MessageHandler): PropertyDecorator {
    return Pattern(/^[a-z0-9]+$/i, MessageHandlers['alphanumeric'])
}