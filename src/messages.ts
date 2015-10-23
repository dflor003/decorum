/**
 * Callback invoked when a validation needs to return an error. Parameters include field name,
 * field value, and any other properties relating to the field validation itself.
 */
export type MessageHandler = (fieldName: string, fieldValue: any, ...args: any[]) => string;

/**
 * A map of validation "key" (unique name for a given type of validation) to message handler callback.
 */
export interface IMessageHandlerMap {
    [key: string]: MessageHandler;
}

/**
 * Mechanism for overriding validation errors to provide for custom or localized error messages.
 * @type {{IMessageHandlerMap}}
 */
let MessageHandlers: IMessageHandlerMap = {};

export default MessageHandlers;