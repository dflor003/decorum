import Pattern from './pattern';
import MessageHandlers from '../messages';
import {MessageHandler} from '../messages';

MessageHandlers['alpha'] = (fieldName: string) => `${fieldName} must only contain alphabetic characters`;

/**
 * Validates that a given field only contains alpha values.
 * @param message [Optional] Overrides the default validation error message.
 * @returns {function(Object, string): void} A field validation decorator.
 */
export default function Alpha(message?: string|MessageHandler): PropertyDecorator {
    return Pattern(/^[a-z]+$/i, MessageHandlers['alpha']);
}