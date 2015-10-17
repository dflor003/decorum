import PatternValidator from "./pattern";

export default class EmailValidator extends PatternValidator {
    static EmailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;

    constructor(message?: string) {
        super(EmailValidator.EmailRegex, message);
    }

    getMessage(fieldName: string, fieldValue: any): string {
        return `${fieldName} is not a valid email address`;
    }

    getKey(): string {
        return 'email';
    }
}