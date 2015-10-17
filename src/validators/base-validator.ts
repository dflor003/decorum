abstract class BaseValidator {
    private static KeyRegex = /^[a-z0-9_-]+$/i;
    private validatorKey: string;
    private message: string;

    constructor(validatorKey: string, message: string) {
        if (!validatorKey) {
            throw new Error('Must pass validator key.')
        }
        if (!BaseValidator.KeyRegex.test(validatorKey)) {
            throw new Error('Validator key must be a valid JS property name');
        }

        this.validatorKey = validatorKey;
        this.message = message;
    }

    getCustomMessage(): string {
        return this.message;
    }

    getKey(): string {
        return this.validatorKey;
    }

    abstract getMessage(fieldName: string, fieldValue: any): string;

    abstract isValid(value: any, model: any): boolean;
}

export default BaseValidator;