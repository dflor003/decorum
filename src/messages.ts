import BaseValidator from './validators/base-validator';

/**
 * Callback invoked when a validation needs to return an error. The first parameter is an object
 * wrapping metadata about the field such as the field name, friendly name, value, etc.
 * The second parameter is the validator instance that triggered the error.
 */
export interface MessageHandler<TValidator extends BaseValidator> {
    (opts: IMessageOpts, validator: TValidator): string;
}

/**
 * Options passed to a field to aid in generating a message. Contains data about
 * the field such as name, friendly name, and value.
 */
export interface IMessageOpts {
    /**
     * The property name from the model. I.e. 'emailAddress', 'username', etc.
     */
    property: string;

    /**
     * The friendly name for the field. I.e. 'Email address', 'Password Confirmation', etc.
     */
    friendlyName: string;

    /**
     * The current value of the field at the time the validation error was generated.
     */
    value: string;
}

/**
 * A map of validation "key" (unique name for a given type of validation) to message handler callback.
 */
export interface IMessageHandlerMap {
    [key: string]: MessageHandler<any>;
}

/**
 * Mechanism for overriding validation errors to provide for custom or localized error messages.
 * @type {{IMessageHandlerMap}}
 */
let MessageHandlers: IMessageHandlerMap = {};

export default MessageHandlers;