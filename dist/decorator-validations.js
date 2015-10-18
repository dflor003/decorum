(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.lib || (g.lib = {})).validations = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var validation_manager_1 = require('../validation-manager');
var custom_1 = require('../validators/custom');
function Validation(message, predicate) {
    return function (targetClass, property) {
        var manager = validation_manager_1.default.get(targetClass);
        manager.addValidator(property, new custom_1.default(predicate, message));
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Validation;
},{"../validation-manager":12,"../validators/custom":15}],2:[function(require,module,exports){
var email_1 = require('../validators/email');
var validation_manager_1 = require('../validation-manager');
function Email(message) {
    return function (targetClass, property) {
        var manager = validation_manager_1.default.get(targetClass);
        manager.addValidator(property, new email_1.default(message));
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Email;
},{"../validation-manager":12,"../validators/email":16}],3:[function(require,module,exports){
var validation_manager_1 = require('../validation-manager');
function FieldName(name) {
    return function (targetClass, property) {
        var manager = validation_manager_1.default.get(targetClass);
        manager.setFieldName(property, name);
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FieldName;
},{"../validation-manager":12}],4:[function(require,module,exports){
var validation_manager_1 = require('../validation-manager');
var length_1 = require('../validators/length');
function Length(length, message) {
    return function (targetClass, property) {
        var manager = validation_manager_1.default.get(targetClass);
        manager.addValidator(property, new length_1.default(length, message));
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Length;
},{"../validation-manager":12,"../validators/length":17}],5:[function(require,module,exports){
var validation_manager_1 = require('../validation-manager');
var max_length_1 = require('../validators/max-length');
function MaxLength(maxLength, message) {
    return function (targetClass, property) {
        var manager = validation_manager_1.default.get(targetClass);
        manager.addValidator(property, new max_length_1.default(maxLength, message));
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MaxLength;
},{"../validation-manager":12,"../validators/max-length":18}],6:[function(require,module,exports){
var validation_manager_1 = require('../validation-manager');
var min_length_1 = require('../validators/min-length');
function MinLength(minLength, message) {
    return function (targetClass, property) {
        var manager = validation_manager_1.default.get(targetClass);
        manager.addValidator(property, new min_length_1.default(minLength, message));
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MinLength;
},{"../validation-manager":12,"../validators/min-length":19}],7:[function(require,module,exports){
var validation_manager_1 = require('../validation-manager');
var pattern_1 = require('../validators/pattern');
function Pattern(regex, message) {
    return function (targetClass, property) {
        var manager = validation_manager_1.default.get(targetClass);
        manager.addValidator(property, new pattern_1.default(regex, message));
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Pattern;
},{"../validation-manager":12,"../validators/pattern":20}],8:[function(require,module,exports){
var required_1 = require('../validators/required');
var validation_manager_1 = require('../validation-manager');
function Required(message) {
    return function (targetClass, property) {
        var manager = validation_manager_1.default.get(targetClass);
        manager.addValidator(property, new required_1.default(message));
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Required;
},{"../validation-manager":12,"../validators/required":21}],9:[function(require,module,exports){
var FieldOptions = (function () {
    function FieldOptions() {
        this.fieldName = 'Field';
        this.validators = [];
    }
    FieldOptions.prototype.getFieldName = function () {
        return this.fieldName;
    };
    FieldOptions.prototype.setFieldName = function (name) {
        this.fieldName = name;
    };
    FieldOptions.prototype.addValidator = function (validator) {
        this.validators.push(validator);
    };
    FieldOptions.prototype.getValidators = function () {
        return this.validators;
    };
    FieldOptions.prototype.validateValue = function (value, model) {
        var errors = [], fieldName = this.fieldName, isEmpty = !value;
        for (var i = 0; i < this.validators.length; i++) {
            var validator = this.validators[i];
            if (!validator.validatesEmptyValue() && isEmpty) {
                continue;
            }
            if (!validator.isValid(value, model)) {
                var message = validator.hasCustomMessage
                    ? validator.getCustomMessage()
                    : validator.getMessage(fieldName, value);
                errors.push(message);
            }
        }
        return errors;
    };
    return FieldOptions;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FieldOptions;
},{}],10:[function(require,module,exports){
var MessageHandlers = {};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MessageHandlers;
},{}],11:[function(require,module,exports){
var validation_manager_1 = require('./validation-manager');
var ModelValidator = (function () {
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
    ModelValidator.prototype.getValidationOptions = function (fieldKey) {
        var fieldValidations = this.validations[fieldKey];
        if (!fieldValidations) {
            console.warn("Validation attempted for field " + fieldKey + ", but it was not setup");
            return null;
        }
        return fieldValidations;
    };
    ModelValidator.prototype.validateField = function (fieldKey, proposedValue) {
        var fieldValidations = this.getValidationOptions(fieldKey);
        if (!fieldValidations) {
            return [];
        }
        var value = arguments.length < 2 ? this.model[fieldKey] : proposedValue;
        return fieldValidations.validateValue(value, this.model);
    };
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
                        fieldName: this.getValidationOptions(fieldKey).getFieldName(),
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
},{"./validation-manager":12}],12:[function(require,module,exports){
var field_options_1 = require('./field-options');
var ValidationManager = (function () {
    function ValidationManager() {
        this.fieldValidations = {};
    }
    ValidationManager.get = function (targetClass) {
        return targetClass[ValidationManager.ValidationsKey] || (targetClass[ValidationManager.ValidationsKey] = new ValidationManager());
    };
    ValidationManager.prototype.setFieldName = function (property, newName) {
        this.getFieldOptions(property).setFieldName(newName);
    };
    ValidationManager.prototype.addValidator = function (property, validator) {
        this.getFieldOptions(property).addValidator(validator);
    };
    ValidationManager.prototype.getValidations = function () {
        return this.fieldValidations;
    };
    ValidationManager.prototype.getFieldOptions = function (property) {
        return this.fieldValidations[property] || (this.fieldValidations[property] = new field_options_1.default());
    };
    ValidationManager.ValidationsKey = '__validations__';
    return ValidationManager;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ValidationManager;
},{"./field-options":9}],13:[function(require,module,exports){
var model_validator_1 = require('./model-validator');
var Validator = (function () {
    function Validator() {
    }
    Validator.new = function (model) {
        return new model_validator_1.default(model);
    };
    Validator.setValidations = function (objectType, definitions) {
        if (!objectType) {
            throw new Error('Validator.setValidations: No class passed!');
        }
        if (!objectType.prototype) {
            throw new Error('Validator.setValidations: First parameter must be a valid class with a prototype!');
        }
        if (!definitions) {
            throw new Error('Validator.setValidations: Definitions must be a valid map of field name to validator values');
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
    Validator.validate = function (model) {
        return new model_validator_1.default(model).validate();
    };
    return Validator;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Validator;
},{"./model-validator":11}],14:[function(require,module,exports){
var BaseValidator = (function () {
    function BaseValidator(validatorKey, message) {
        if (!validatorKey) {
            throw new Error('Must pass validator key.');
        }
        if (!BaseValidator.KeyRegex.test(validatorKey)) {
            throw new Error('Validator key must be a valid JS property name');
        }
        this.validatorKey = validatorKey;
        this.message = message;
    }
    Object.defineProperty(BaseValidator.prototype, "hasCustomMessage", {
        get: function () {
            return !!this.message;
        },
        enumerable: true,
        configurable: true
    });
    BaseValidator.prototype.validatesEmptyValue = function () {
        return false;
    };
    BaseValidator.prototype.getCustomMessage = function () {
        return this.message;
    };
    BaseValidator.prototype.getKey = function () {
        return this.validatorKey;
    };
    BaseValidator.KeyRegex = /^[a-z0-9_-]+$/i;
    return BaseValidator;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaseValidator;
},{}],15:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_validator_1 = require('./base-validator');
var CustomValidator = (function (_super) {
    __extends(CustomValidator, _super);
    function CustomValidator(predicate, message) {
        _super.call(this, "customValidator" + CustomValidator.CustomValidatorCount++, message);
        this.predicate = predicate;
    }
    CustomValidator.prototype.getMessage = function (fieldName, fieldValue) {
        return this.getCustomMessage();
    };
    CustomValidator.prototype.isValid = function (value, model) {
        return this.predicate(value, model);
    };
    CustomValidator.CustomValidatorCount = 0;
    return CustomValidator;
})(base_validator_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CustomValidator;
},{"./base-validator":14}],16:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pattern_1 = require('./pattern');
var messages_1 = require('../messages');
messages_1.default['email'] = function (fieldName, fieldValue) { return (fieldName + " is not a valid email address"); };
var EmailValidator = (function (_super) {
    __extends(EmailValidator, _super);
    function EmailValidator(message) {
        _super.call(this, EmailValidator.EmailRegex, message);
    }
    EmailValidator.prototype.getMessage = function (fieldName, fieldValue) {
        return messages_1.default['email'](fieldName, fieldValue);
    };
    EmailValidator.prototype.getKey = function () {
        return 'email';
    };
    EmailValidator.EmailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;
    return EmailValidator;
})(pattern_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmailValidator;
},{"../messages":10,"./pattern":20}],17:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_validator_1 = require('./base-validator');
var messages_1 = require('../messages');
messages_1.default['length'] =
    function (fieldName, fieldValue, length) {
        return (fieldName + " must be " + length + " characters long.");
    };
var LengthValidator = (function (_super) {
    __extends(LengthValidator, _super);
    function LengthValidator(length, message) {
        _super.call(this, 'length', message);
        if (typeof length !== 'number' || length <= 0) {
            throw new Error('Length must be a positive integer greater than 0');
        }
        this.length = length;
    }
    LengthValidator.prototype.getMessage = function (fieldName, fieldValue) {
        return messages_1.default['length'](fieldName, fieldValue, this.length);
    };
    LengthValidator.prototype.isValid = function (value) {
        return value.length === this.length;
    };
    return LengthValidator;
})(base_validator_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LengthValidator;
},{"../messages":10,"./base-validator":14}],18:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_validator_1 = require('./base-validator');
var messages_1 = require('../messages');
messages_1.default['maxlength'] =
    function (fieldName, fieldValue, maxLength) {
        return (fieldName + " can not exceed " + maxLength + " characters in length");
    };
var MaxLengthValidator = (function (_super) {
    __extends(MaxLengthValidator, _super);
    function MaxLengthValidator(maxLength, message) {
        _super.call(this, 'maxlength', message);
        if (typeof maxLength !== 'number' || maxLength <= 0) {
            throw new Error('Max length must be positive integer greater than 0');
        }
        this.maxLength = maxLength;
    }
    MaxLengthValidator.prototype.getMessage = function (fieldName, fieldValue) {
        return messages_1.default['maxlength'](fieldName, fieldValue, this.maxLength);
    };
    MaxLengthValidator.prototype.isValid = function (value) {
        return value.length <= this.maxLength;
    };
    return MaxLengthValidator;
})(base_validator_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MaxLengthValidator;
},{"../messages":10,"./base-validator":14}],19:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_validator_1 = require('./base-validator');
var messages_1 = require('../messages');
messages_1.default['minlength'] =
    function (fieldName, fieldValue, minLength) {
        return (fieldName + " must be at least " + minLength + " characters long");
    };
var MinLengthValidator = (function (_super) {
    __extends(MinLengthValidator, _super);
    function MinLengthValidator(minLength, message) {
        _super.call(this, 'minlength', message);
        if (typeof minLength !== 'number' || minLength <= 0) {
            throw new Error('Min length must be positive integer greater than 0');
        }
        this.minLength = minLength;
    }
    MinLengthValidator.prototype.getMessage = function (fieldName, fieldValue) {
        return messages_1.default['minlength'](fieldName, fieldValue, this.minLength);
    };
    MinLengthValidator.prototype.isValid = function (value) {
        return value.length >= this.minLength;
    };
    return MinLengthValidator;
})(base_validator_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MinLengthValidator;
},{"../messages":10,"./base-validator":14}],20:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_validator_1 = require('./base-validator');
var messages_1 = require('../messages');
messages_1.default['pattern'] =
    function (fieldName, fieldValue, regex) {
        return (fieldName + " is not valid");
    };
var PatternValidator = (function (_super) {
    __extends(PatternValidator, _super);
    function PatternValidator(pattern, message) {
        _super.call(this, 'pattern', message);
        this.pattern = pattern;
    }
    PatternValidator.prototype.getMessage = function (fieldName, fieldValue) {
        return messages_1.default['pattern'](fieldName, fieldValue, this.pattern);
    };
    PatternValidator.prototype.isValid = function (value) {
        return this.pattern.test(value);
    };
    return PatternValidator;
})(base_validator_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PatternValidator;
},{"../messages":10,"./base-validator":14}],21:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_validator_1 = require('./base-validator');
var messages_1 = require('../messages');
messages_1.default['required'] =
    function (fieldName, fieldValue) {
        return (fieldName + " is required");
    };
var RequiredFieldValidator = (function (_super) {
    __extends(RequiredFieldValidator, _super);
    function RequiredFieldValidator(message) {
        _super.call(this, 'required', message);
    }
    RequiredFieldValidator.prototype.validatesEmptyValue = function () {
        return true;
    };
    RequiredFieldValidator.prototype.getMessage = function (fieldName, fieldValue) {
        return messages_1.default['required'](fieldName, fieldValue);
    };
    RequiredFieldValidator.prototype.isValid = function (value) {
        return typeof value === 'string' && !!value.trim();
    };
    return RequiredFieldValidator;
})(base_validator_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RequiredFieldValidator;
},{"../messages":10,"./base-validator":14}],22:[function(require,module,exports){
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
var validator_1 = require('./validator');
exports.Validator = validator_1.default;
var model_validator_1 = require('./model-validator');
exports.ModelValidator = model_validator_1.default;
var messages_1 = require('./messages');
exports.Messages = messages_1.default;
},{"./decorators/custom-validation":1,"./decorators/email":2,"./decorators/field-name":3,"./decorators/length":4,"./decorators/max-length":5,"./decorators/min-length":6,"./decorators/pattern":7,"./decorators/required":8,"./messages":10,"./model-validator":11,"./validator":13}]},{},[22])(22)
});
//# sourceMappingURL=decorator-validations.js.map
