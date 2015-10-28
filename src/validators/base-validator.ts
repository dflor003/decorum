import {MessageHandler} from '../messages';
import {IMessageOpts} from '../messages';

/**
 * Base abstract class for all validators. Methods that must be overridden:
 *  getMessage(...) - Get error message to return when field is invalid.
 *  isValid(...)    - Check validity of field given proposed value and the rest of the model.
 */
abstract class BaseValidator {
    private static KeyRegex = /^[a-z0-9_-]+$/i;
    private validatorKey: string;
    private message: string|MessageHandler<any>;

    /**
     * Initializes the {BaseValidator}
     * @param validatorKey A unique "key" by which to identify this field validator i.e. length, maxlength, required.
     * Should be a valid JS property name.
     * @param message A custom error message to return. Should be passed down from concrete class' constructors to enable
     * customizing error messages.
     */
    constructor(validatorKey: string, message: string|MessageHandler<any>) {
        if (!validatorKey) {
            throw new Error('Must pass validator key.');
        }
        if (!BaseValidator.KeyRegex.test(validatorKey)) {
            throw new Error('Validator key must be a valid JS property name');
        }

        this.validatorKey = validatorKey;
        this.message = message || null;
    }

    /**
     * Returns true if the validator instance was passed a custom error message.
     */
    get hasCustomMessage(): boolean {
        return !!this.message;
    }

    /**
     * Check whether this validator should process an "empty" value (i.e. null, undefined, empty string). Override
     * this in derived classes to skip validators if the field value hasn't been set. Things like email, min/max length,
     * and pattern should return false for this to ensure they don't get fired when the model is initially empty
     * before a user has had a chance to input a value. Things like required should override this to true so that
     * they are fired for empty values. Base implementation defaults to false
     * @returns {boolean}
     */
    validatesEmptyValue(): boolean {
        return false;
    }

    /**
     * Gets the custom error message set on this validator.
     * @param opts Metadata about the field such as name and friendly name.
     * @returns {string} The custom error message or null if none has been set.
     */
    getCustomMessage(opts: IMessageOpts): string {
        if (typeof this.message === 'function') {
            return (<MessageHandler<any>>this.message)(opts, this);
        }

        return <string>this.message;
    }

    /**
     * Gets the unique name for this validator.
     * @returns {string} The unique name for this validator.
     */
    getKey(): string {
        return this.validatorKey;
    }

    /**
     * [Abstract] Gets the error message to display when a field fails validation by this validator.
     * @param opts Metadata about the field such as name and friendly name.
     */
    abstract getMessage(opts: IMessageOpts): string;

    /**
     * [Abstract] Checks the passed value for validity.
     * @param value The field's proposed value.
     * @param model The rest of the model if cross-field validity checks are necessary.
     */
    abstract isValid(value: any, model: any): boolean;
}

export default BaseValidator;