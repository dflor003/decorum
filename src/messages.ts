export type MessageHandler = (fieldName: string, fieldValue: any, ...args: any[]) => string;

export interface IMessageHandlerMap {
    [key: string]: MessageHandler;
}

let MessageHandlers: IMessageHandlerMap = {};

export default MessageHandlers;