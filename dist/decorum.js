/*!
 * decorum - 0.2.0-alpha
 *
 * ES7 decorator-based validation framework.
 *
 * Copyright 2015 Danil Flores
 *
 * @version v0.2.0-alpha
 * @link https://github.com/dflor003/decorum
 * @license MIT
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.decorum = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var pattern_1 = require('./pattern');
var messages_1 = require('../messages');
messages_1.default['alphanumeric'] = function (opts) { return (opts.friendlyName + " must only contain alphanumeric characters"); };
/**
 * Validates that a given field only contains alphanumeric values.
 * @param message [Optional] Overrides the default validation error message.
 * @returns {function(Object, string): void} A field validation decorator.
 */
function AlphaNumeric(message) {
    return pattern_1.default(/^[a-z0-9]+$/i, message || messages_1.default['alphanumeric']);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AlphaNumeric;
},{"../messages":12,"./pattern":9}],2:[function(require,module,exports){
var pattern_1 = require('./pattern');
var messages_1 = require('../messages');
messages_1.default['alpha'] = function (opts) { return (opts.friendlyName + " must only contain alphabetic characters"); };
/**
 * Validates that a given field only contains alpha values.
 * @param message [Optional] Overrides the default validation error message.
 * @returns {function(Object, string): void} A field validation decorator.
 */
function Alpha(message) {
    return pattern_1.default(/^[a-z]+$/i, message || messages_1.default['alpha']);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Alpha;
},{"../messages":12,"./pattern":9}],3:[function(require,module,exports){
var custom_1 = require('../validators/custom');
var validator_1 = require('../validator');
/**
 * A generic custom validation. Takes a predicate that will receive the proposed value as the first parameter and the
 * current model state as the second.
 * @param message The message to display when the predicate fails.
 * @param predicate A lambda expression/function that determines if the value is valid. If it returns a falsy value, the
 * field will be considered invalid and will return the passed error message upon validation.
 * @returns {function(Object, string): void} A field validation decorator.
 */
function Validation(message, predicate) {
    return function (targetClass, property) {
        validator_1.default.addValidator(targetClass, property, new custom_1.default(predicate, message));
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Validation;
},{"../validator":15,"../validators/custom":17}],4:[function(require,module,exports){
var email_1 = require('../validators/email');
var validator_1 = require('../validator');
/**
 * Validate's that the field is a valid email address. The format used is the same as the webkit browser's internal
 * email validation format. For looser or stricter formats, use your own validation based on the @Pattern decorator.
 * @param message [Optional] Overrides the default validation error message.
 * @returns {function(Object, string): void} A field validation decorator.
 */
function Email(message) {
    return function (targetClass, property) {
        validator_1.default.addValidator(targetClass, property, new email_1.default(message));
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Email;
},{"../validator":15,"../validators/email":18}],5:[function(require,module,exports){
var validation_manager_1 = require('../validation-manager');
/**
 * Sets the field's "friendly" name in validation error messages.
 * @param name The field's friendly name
 * @returns {function(Object, string): void} A field validation decorator.
 */
function FieldName(name) {
    return function (targetClass, property) {
        var manager = validation_manager_1.default.get(targetClass);
        manager.setFieldName(property, name);
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FieldName;
},{"../validation-manager":14}],6:[function(require,module,exports){
var length_1 = require('../validators/length');
var validator_1 = require('../validator');
/**
 * Validate's a field's EXACT length. Validation fails if the field is not EXACTLY the length passed.
 * @param length The exact length the field must be.
 * @param message [Optional] Overrides the default validation error message.
 * @returns {function(Object, string): void} A field validation decorator.
 */
function Length(length, message) {
    return function (targetClass, property) {
        validator_1.default.addValidator(targetClass, property, new length_1.default(length, message));
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Length;
},{"../validator":15,"../validators/length":19}],7:[function(require,module,exports){
var max_length_1 = require('../validators/max-length');
var validator_1 = require('../validator');
/**
 * Validates a field's maximum length.
 * @param maxLength The field's maximum length. Must be a positive integer greater than 1.
 * @param message [Optional] Overrides the default validation error message.
 * @returns {function(Object, string): void} A field validation decorator.
 */
function MaxLength(maxLength, message) {
    return function (targetClass, property) {
        validator_1.default.addValidator(targetClass, property, new max_length_1.default(maxLength, message));
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MaxLength;
},{"../validator":15,"../validators/max-length":20}],8:[function(require,module,exports){
var min_length_1 = require('../validators/min-length');
var validator_1 = require('../validator');
/**
 * Validates the field's minimum length.
 * @param minLength The field's minimum length. Must be a positive integer greater than 0
 * @param message [Optional] Overrides the default validation error message.
 * @returns {function(Object, string): void} A field validation decorator.
 */
function MinLength(minLength, message) {
    return function (targetClass, property) {
        validator_1.default.addValidator(targetClass, property, new min_length_1.default(minLength, message));
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MinLength;
},{"../validator":15,"../validators/min-length":21}],9:[function(require,module,exports){
var pattern_1 = require('../validators/pattern');
var validator_1 = require('../validator');
/**
 * Validates the field against a regular expression pattern.
 * @param regex The regex to validate against. Should be a valid JavaScript {RegExp} instance.
 * @param message [Optional] Overrides the default validation error message.
 * @returns {function(Object, string): void} A field validation decorator.
 */
function Pattern(regex, message) {
    return function (targetClass, property) {
        validator_1.default.addValidator(targetClass, property, new pattern_1.default(regex, message));
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Pattern;
},{"../validator":15,"../validators/pattern":22}],10:[function(require,module,exports){
var required_1 = require('../validators/required');
var validator_1 = require('../validator');
/**
 * Marks the field as required.
 * @param message [Optional] Overrides the default validation error message.
 * @returns {function(Object, string): void} A field validation decorator.
 */
function Required(message) {
    return function (targetClass, property) {
        validator_1.default.addValidator(targetClass, property, new required_1.default(message));
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Required;
},{"../validator":15,"../validators/required":23}],11:[function(require,module,exports){
/**
 * Validation options for a given field including actual validators and meta data such as the field name.
 */
var FieldOptions = (function () {
    function FieldOptions(property) {
        this.friendlyName = 'Field';
        this.validators = [];
        this.property = property;
    }
    /**
     * Gets the "friendly" name of the field for use in validation error messages. Defaults to just "Field".
     * @returns {string}
     */
    FieldOptions.prototype.getFriendlyName = function () {
        return this.friendlyName;
    };
    /**
     * Sets the "friendly" name of the field for use in validation error messages. This name will be used in the text
     * of validation errors.
     * @param name The new name to set.
     */
    FieldOptions.prototype.setFriendlyName = function (name) {
        this.friendlyName = name;
    };
    /**
     * Add a validator to the list of validators for this field.
     * @param validator The validator to add. Should be a class that extends from {BaseValidator}.
     */
    FieldOptions.prototype.addValidator = function (validator) {
        this.validators.push(validator);
    };
    /**
     * Gets the validators assigned to this field.
     * @returns {BaseValidator[]} The validators for this field.
     */
    FieldOptions.prototype.getValidators = function () {
        return this.validators;
    };
    /**
     * Runs through all of the validators for the field given a particular value and returns any validation errors that
     * may have occurred.
     * @param value The value to validate.
     * @param model The rest of the model. Used in custom cross-field validations.
     * @returns {string[]} Any validation errors that may have occurred or an empty array if the value passed is valid
     * for the field.
     */
    FieldOptions.prototype.validateValue = function (value, model) {
        var errors = [], isEmpty = typeof value === 'undefined' || value === null || (typeof value === 'string' && !value), msgOpts = {
            property: this.property,
            friendlyName: this.friendlyName,
            value: value
        };
        for (var i = 0; i < this.validators.length; i++) {
            var validator = this.validators[i];
            if (!validator.validatesEmptyValue() && isEmpty) {
                continue;
            }
            if (!validator.isValid(value, model)) {
                var message = validator.hasCustomMessage
                    ? validator.getCustomMessage(msgOpts)
                    : validator.getMessage(msgOpts);
                errors.push(message);
            }
        }
        return errors;
    };
    return FieldOptions;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FieldOptions;
},{}],12:[function(require,module,exports){
/**
 * Mechanism for overriding validation errors to provide for custom or localized error messages.
 * @type {{IMessageHandlerMap}}
 */
var MessageHandlers = {};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MessageHandlers;
},{}],13:[function(require,module,exports){
var validation_manager_1 = require('./validation-manager');
/**
 * Wraps a model to allow the consuming class to call validation methods.
 */
var ModelValidator = (function () {
    /**
     * Creates a new model validator.
     * @param model The model to validate. Should be a class that has a valid constructor function and prototype.
     */
    function ModelValidator(model) {
        if (!model) {
            throw new Error('Validator: No model passed');
        }
        if (!model.constructor) {
            throw new Error('Model has no constructor function');
        }
        if (!model.constructor.prototype) {
            throw new Error('Could not find prototype of model');
        }
        var validationManager = validation_manager_1.default.get(model.constructor.prototype);
        this.validations = validationManager.getValidations();
        this.model = model;
    }
    /**
     * Gets the validation options for the given field name.
     * @param fieldKey         The name of the field to get options for.
     * @returns {FieldOptions} The field options associated with that field or null if no validations defined
     * for the field.
     */
    ModelValidator.prototype.getValidationOptions = function (fieldKey) {
        var fieldValidations = this.validations[fieldKey];
        if (!fieldValidations) {
            console.warn("Validation attempted for field " + fieldKey + ", but it was not setup");
            return null;
        }
        return fieldValidations;
    };
    /**
     * Validates the given field on this {ModelValidator}'s model. If a proposed value is passed, validate
     * against that passed value; otherwise, use the field's current value on the model.
     * @param fieldKey      The name of the field to validate.
     * @param proposedValue [Optional] The proposed value to set on the field.
     * @returns {string[]}  An array of field validation error messages if the field is invalid; otherwise,
     * an empty array.
     */
    ModelValidator.prototype.validateField = function (fieldKey, proposedValue) {
        var fieldValidations = this.getValidationOptions(fieldKey);
        if (!fieldValidations) {
            return [];
        }
        var value = arguments.length < 2 ? this.model[fieldKey] : proposedValue;
        return fieldValidations.validateValue(value, this.model);
    };
    /**
     * Validate the entire model and return a result that indicates whether the model is valid or not and any errors
     * that have occurred in an object indexed by field name on the model.
     * @returns {IValidationResult} An object that contains whether the model is valid or not and errors by field name.
     */
    ModelValidator.prototype.validate = function () {
        var validations = this.validations, result = {
            isValid: true,
            errors: []
        };
        for (var fieldKey in validations) {
            if (validations.hasOwnProperty(fieldKey)) {
                var errors = this.validateField(fieldKey);
                if (errors.length) {
                    result.isValid = false;
                    result.errors.push({
                        field: fieldKey,
                        fieldName: this.getValidationOptions(fieldKey).getFriendlyName(),
                        errors: errors
                    });
                }
            }
        }
        return result;
    };
    return ModelValidator;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ModelValidator;
},{"./validation-manager":14}],14:[function(require,module,exports){
var field_options_1 = require('./field-options');
/**
 * Core class that is responsible for managing validations on class types.
 */
var ValidationManager = (function () {
    function ValidationManager() {
        this.fieldValidations = {};
    }
    /**
     * Gets the validation manager instance for the passed class. If one already exists for that class, it will return
     * the same instance. If one does not exist, a new one will be created.
     * @param targetClass A valid ES6 class or ES5 function constructor.
     * @returns {*|ValidationManager} An instance of ValidationManager tied to the passed class.
     */
    ValidationManager.get = function (targetClass) {
        return targetClass[ValidationManager.ValidationsKey] || (targetClass[ValidationManager.ValidationsKey] = new ValidationManager());
    };
    /**
     * Sets the "friendly" name of the field to be used in validation messages.
     * @param property The property to set the field name for.
     * @param newName The name to set.
     */
    ValidationManager.prototype.setFieldName = function (property, newName) {
        this.getFieldOptions(property).setFriendlyName(newName);
    };
    /**
     * Add a validation for the given property to the model.
     * @param property The property to add a validation for.
     * @param validator The validator to add.
     */
    ValidationManager.prototype.addValidator = function (property, validator) {
        this.getFieldOptions(property).addValidator(validator);
    };
    /**
     * Gets all the validations associated with the class type that this ValidationManager is bound to.
     * @returns {FieldValidations} A map of field name to {FieldOptions}.
     */
    ValidationManager.prototype.getValidations = function () {
        return this.fieldValidations;
    };
    /**
     * Gets the field options for the given model property.
     * @param property The property to get field options for.
     * @returns {FieldOptions} An object containing the validators and other options assigned to this field.
     */
    ValidationManager.prototype.getFieldOptions = function (property) {
        return this.fieldValidations[property] || (this.fieldValidations[property] = new field_options_1.default(property));
    };
    ValidationManager.ValidationsKey = '__validations__';
    return ValidationManager;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ValidationManager;
},{"./field-options":11}],15:[function(require,module,exports){
var model_validator_1 = require('./model-validator');
var validation_manager_1 = require('./validation-manager');
/**
 * Static container for convenience methods related to field validation.
 */
var Validator = (function () {
    function Validator() {
    }
    /**
     * Creates a new model validator for the given model. Model should be a valid class that has a valid constructor
     * and a prototype.
     * @param model The model to create the validator for.
     * @returns {ModelValidator} An instance of {ModelValidator}
     */
    Validator.new = function (model) {
        return new model_validator_1.default(model);
    };
    /**
     * Decorates the passed class with model validations. Use this when you do not have access to ES7 decorators.
     * The object passed should be a valid class (ES6 class or ES5 function constructor).
     * @param objectType The class to decorate.
     * @param definitions One or more field validation definitions of the form { "fieldName": [ decorators ] }.
     */
    Validator.decorate = function (objectType, definitions) {
        if (!objectType) {
            throw new Error('Validator.decorate: No class passed!');
        }
        if (!objectType.prototype) {
            throw new Error('Validator.decorate: First parameter must be a valid class with a prototype!');
        }
        if (!definitions) {
            throw new Error('Validator.decorate: Definitions must be a valid map of field name to validator values');
        }
        var prototype = objectType.prototype;
        for (var field in definitions) {
            if (!definitions.hasOwnProperty(field)) {
                continue;
            }
            var decorators = definitions[field];
            for (var i = 0; i < decorators.length; i++) {
                var decorator = decorators[i];
                decorator(prototype, field);
            }
        }
    };
    /**
     * Creates an anonymous validator, immediately validates the model, and returns any validation errors on the model
     * as a result.
     * @param model The model to validate.
     */
    Validator.validate = function (model) {
        return new model_validator_1.default(model).validate();
    };
    /**
     * Adds a validator to the given object prototype for the given property. Meant to be used inside of validation
     * decorators to inject the validation onto the object property.
     * @param targetPrototype A valid object prototype to add to.
     * @param property The property to add the validator for.
     * @param validator The validator to add.
     */
    Validator.addValidator = function (targetPrototype, property, validator) {
        var manager = validation_manager_1.default.get(targetPrototype);
        manager.addValidator(property, validator);
    };
    return Validator;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Validator;
},{"./model-validator":13,"./validation-manager":14}],16:[function(require,module,exports){
/**
 * Base abstract class for all validators. Methods that must be overridden:
 *  getMessage(...) - Get error message to return when field is invalid.
 *  isValid(...)    - Check validity of field given proposed value and the rest of the model.
 */
var BaseValidator = (function () {
    /**
     * Initializes the {BaseValidator}
     * @param validatorKey A unique "key" by which to identify this field validator i.e. length, maxlength, required.
     * Should be a valid JS property name.
     * @param message A custom error message to return. Should be passed down from concrete class' constructors to enable
     * customizing error messages.
     */
    function BaseValidator(validatorKey, message) {
        if (!validatorKey) {
            throw new Error('Must pass validator key.');
        }
        if (!BaseValidator.KeyRegex.test(validatorKey)) {
            throw new Error('Validator key must be a valid JS property name');
        }
        this.validatorKey = validatorKey;
        this.message = message || null;
    }
    Object.defineProperty(BaseValidator.prototype, "hasCustomMessage", {
        /**
         * Returns true if the validator instance was passed a custom error message.
         */
        get: function () {
            return !!this.message;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Check whether this validator should process an "empty" value (i.e. null, undefined, empty string). Override
     * this in derived classes to skip validators if the field value hasn't been set. Things like email, min/max length,
     * and pattern should return false for this to ensure they don't get fired when the model is initially empty
     * before a user has had a chance to input a value. Things like required should override this to true so that
     * they are fired for empty values. Base implementation defaults to false
     * @returns {boolean}
     */
    BaseValidator.prototype.validatesEmptyValue = function () {
        return false;
    };
    /**
     * Gets the custom error message set on this validator.
     * @param opts Metadata about the field such as name and friendly name.
     * @returns {string} The custom error message or null if none has been set.
     */
    BaseValidator.prototype.getCustomMessage = function (opts) {
        if (typeof this.message === 'function') {
            return this.message(opts, this);
        }
        return this.message;
    };
    /**
     * Gets the unique name for this validator.
     * @returns {string} The unique name for this validator.
     */
    BaseValidator.prototype.getKey = function () {
        return this.validatorKey;
    };
    BaseValidator.KeyRegex = /^[a-z0-9_-]+$/i;
    return BaseValidator;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaseValidator;
},{}],17:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_validator_1 = require('./base-validator');
/**
 * Custom validation class.
 */
var CustomValidator = (function (_super) {
    __extends(CustomValidator, _super);
    function CustomValidator(predicate, message) {
        _super.call(this, "customValidator" + CustomValidator.CustomValidatorCount++, message);
        this.predicate = predicate;
    }
    CustomValidator.prototype.getMessage = function (opts) {
        return this.getCustomMessage(opts);
    };
    CustomValidator.prototype.isValid = function (value, model) {
        return this.predicate(value, model);
    };
    CustomValidator.CustomValidatorCount = 0;
    return CustomValidator;
})(base_validator_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CustomValidator;
},{"./base-validator":16}],18:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pattern_1 = require('./pattern');
var messages_1 = require('../messages');
messages_1.default['email'] = function (opts) { return (opts.friendlyName + " is not a valid email address"); };
/**
 * An email validator.
 */
var EmailValidator = (function (_super) {
    __extends(EmailValidator, _super);
    function EmailValidator(message) {
        _super.call(this, EmailValidator.EmailRegex, message);
    }
    EmailValidator.prototype.getMessage = function (opts) {
        return messages_1.default['email'](opts, this);
    };
    EmailValidator.prototype.getKey = function () {
        return 'email';
    };
    EmailValidator.EmailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;
    return EmailValidator;
})(pattern_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmailValidator;
},{"../messages":12,"./pattern":22}],19:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_validator_1 = require('./base-validator');
var messages_1 = require('../messages');
messages_1.default['length'] =
    function (opts, validator) {
        return (opts.friendlyName + " must be " + validator.length + " characters long.");
    };
/**
 * An exact length validator.
 */
var LengthValidator = (function (_super) {
    __extends(LengthValidator, _super);
    function LengthValidator(length, message) {
        _super.call(this, 'length', message);
        if (typeof length !== 'number' || length <= 0) {
            throw new Error('Length must be a positive integer greater than 0');
        }
        this.length = length;
    }
    LengthValidator.prototype.getMessage = function (opts) {
        return messages_1.default['length'](opts, this);
    };
    LengthValidator.prototype.isValid = function (value) {
        return value.length === this.length;
    };
    return LengthValidator;
})(base_validator_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LengthValidator;
},{"../messages":12,"./base-validator":16}],20:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_validator_1 = require('./base-validator');
var messages_1 = require('../messages');
messages_1.default['maxlength'] =
    function (opts, validator) {
        return (opts.friendlyName + " can not exceed " + validator.maxLength + " characters in length");
    };
/**
 * A maximum length validator.
 */
var MaxLengthValidator = (function (_super) {
    __extends(MaxLengthValidator, _super);
    function MaxLengthValidator(maxLength, message) {
        _super.call(this, 'maxlength', message);
        if (typeof maxLength !== 'number' || maxLength <= 0) {
            throw new Error('Max length must be positive integer greater than 0');
        }
        this.maxLength = maxLength;
    }
    MaxLengthValidator.prototype.getMessage = function (opts) {
        return messages_1.default['maxlength'](opts, this);
    };
    MaxLengthValidator.prototype.isValid = function (value) {
        return value.length <= this.maxLength;
    };
    return MaxLengthValidator;
})(base_validator_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MaxLengthValidator;
},{"../messages":12,"./base-validator":16}],21:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_validator_1 = require('./base-validator');
var messages_1 = require('../messages');
messages_1.default['minlength'] =
    function (opts, validator) {
        return (opts.friendlyName + " must be at least " + validator.minLength + " characters long");
    };
/**
 * A minimum length validator.
 */
var MinLengthValidator = (function (_super) {
    __extends(MinLengthValidator, _super);
    function MinLengthValidator(minLength, message) {
        _super.call(this, 'minlength', message);
        if (typeof minLength !== 'number' || minLength <= 0) {
            throw new Error('Min length must be positive integer greater than 0');
        }
        this.minLength = minLength;
    }
    MinLengthValidator.prototype.getMessage = function (opts) {
        return messages_1.default['minlength'](opts, this);
    };
    MinLengthValidator.prototype.isValid = function (value) {
        return value.length >= this.minLength;
    };
    return MinLengthValidator;
})(base_validator_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MinLengthValidator;
},{"../messages":12,"./base-validator":16}],22:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_validator_1 = require('./base-validator');
var messages_1 = require('../messages');
messages_1.default['pattern'] =
    function (opts) {
        return (opts.friendlyName + " is not valid");
    };
/**
 * A regular expression validator.
 */
var PatternValidator = (function (_super) {
    __extends(PatternValidator, _super);
    function PatternValidator(pattern, message) {
        _super.call(this, 'pattern', message);
        this.pattern = pattern;
    }
    PatternValidator.prototype.getMessage = function (opts) {
        return messages_1.default['pattern'](opts, this);
    };
    PatternValidator.prototype.isValid = function (value) {
        return this.pattern.test(value);
    };
    return PatternValidator;
})(base_validator_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PatternValidator;
},{"../messages":12,"./base-validator":16}],23:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_validator_1 = require('./base-validator');
var messages_1 = require('../messages');
messages_1.default['required'] =
    function (opts) {
        return (opts.friendlyName + " is required");
    };
/**
 * A field requiredness validator.
 */
var RequiredFieldValidator = (function (_super) {
    __extends(RequiredFieldValidator, _super);
    function RequiredFieldValidator(message) {
        _super.call(this, 'required', message);
    }
    RequiredFieldValidator.prototype.validatesEmptyValue = function () {
        return true;
    };
    RequiredFieldValidator.prototype.getMessage = function (opts) {
        return messages_1.default['required'](opts, this);
    };
    RequiredFieldValidator.prototype.isValid = function (value) {
        return typeof value === 'string' && !!value.trim();
    };
    return RequiredFieldValidator;
})(base_validator_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RequiredFieldValidator;
},{"../messages":12,"./base-validator":16}],24:[function(require,module,exports){
var custom_validation_1 = require('./decorators/custom-validation');
exports.Validation = custom_validation_1.default;
var email_1 = require('./decorators/email');
exports.Email = email_1.default;
var field_name_1 = require('./decorators/field-name');
exports.FieldName = field_name_1.default;
var length_1 = require('./decorators/length');
exports.Length = length_1.default;
var max_length_1 = require('./decorators/max-length');
exports.MaxLength = max_length_1.default;
var min_length_1 = require('./decorators/min-length');
exports.MinLength = min_length_1.default;
var pattern_1 = require('./decorators/pattern');
exports.Pattern = pattern_1.default;
var required_1 = require('./decorators/required');
exports.Required = required_1.default;
var alpha_1 = require('./decorators/alpha');
exports.Alpha = alpha_1.default;
var alpha_numeric_1 = require('./decorators/alpha-numeric');
exports.AlphaNumeric = alpha_numeric_1.default;
var validator_1 = require('./validator');
exports.Validator = validator_1.default;
var model_validator_1 = require('./model-validator');
exports.ModelValidator = model_validator_1.default;
var messages_1 = require('./messages');
exports.Messages = messages_1.default;
},{"./decorators/alpha":2,"./decorators/alpha-numeric":1,"./decorators/custom-validation":3,"./decorators/email":4,"./decorators/field-name":5,"./decorators/length":6,"./decorators/max-length":7,"./decorators/min-length":8,"./decorators/pattern":9,"./decorators/required":10,"./messages":12,"./model-validator":13,"./validator":15}]},{},[24])(24)
});
//# sourceMappingURL=decorum.js.map
