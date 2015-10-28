import {Required} from '../../../src/main';
import {Email} from '../../../src/main';
import {MinLength} from '../../../src/main';
import {MaxLength} from '../../../src/main';
import {FieldName} from '../../../src/main';
import {Validation} from '../../../src/main';
import {Pattern} from '../../../src/main';
import {Alpha} from '../../../src/main';
import {AlphaNumeric} from '../../../src/main';
import {Validator} from '../../../src/main';
import {ModelValidator} from '../../../src/main';

'use strict';

describe('TypeScript Decorator-based validations', () => {
    class RegistrationModel {
        @Required()
        username: string;

        @FieldName('Email address')
        @Required()
        @Email()
        email: string;

        @FieldName('Password')
        @MinLength(10)
        @MaxLength(30)
        password: string;

        @FieldName('Confirm password')
        @Validation<RegistrationModel>(
            'Passwords must match',
            (value, model) => value === model.password
        )
        confirmPassword: string;

        @Pattern(/^[a-z0-9-]+$/, 'Must be a valid slug tag')
        slug = '';

        @Alpha()
        alphaField = '';

        @FieldName('Alpha numeric field')
        @AlphaNumeric(field => `${field} should contain letters and numbers only`)
        alphaNumericField = '';

        private _myProp: string;

        constructor() {
            this.myProperty = 'foo';
            this.username = '';
            this.email = '';
            this.password = '';
            this.confirmPassword = '';
        }

        @MaxLength(3)
        get myProperty(): string { return this._myProp; }
        set myProperty(value: string) { this._myProp = value; }
    }

    let model: RegistrationModel = null;
    let validator: ModelValidator = null;

    beforeEach(() => {
        model = new RegistrationModel();
        validator = Validator.new(model);
    });

    describe('validateField', () => {
        describe('When field is valid', () => {
            it('Should not return errors', () => {
                // Arrange
                model.username = 'bob001';

                // Act
                let errors = validator.validateField('username');

                // Assert
                expect(errors.length).toBe(0);
            });
        });

        describe('When field is invalid', () => {
            it('should return the error', () => {
                // Arrange
                model.username = '';

                // Act
                let errors = validator.validateField('username');

                // Assert
                expect(errors.length).toBe(1);
                expect(errors[0]).toBe('Field is required');
            });
        });

        describe('When field has @FieldName decorator', () => {
            it('Should return the errors referencing the field name', () => {
                // Arrange
                model.email = '';

                // Act
                let errors = validator.validateField('email');

                // Assert
                expect(errors.length).toBe(1);
                expect(errors[0]).toBe('Email address is required');
            });
        });

        describe('When added to property', () => {
            it('Should perform validation', () => {
                // Arrange
                model.myProperty = 'abcd';

                // Act
                let errors = validator.validateField('myProperty');

                // Assert
                expect(errors.length).toBe(1);
                expect(errors[0]).toBe('Field can not exceed 3 characters in length');
            });
        });
    });

    describe('validateModel', () => {
        describe('When model has one or more field invalid', () => {
            it('Should return validation errors by field', () => {
                // Arrange
                model.username = 'bob001';
                model.email = 'foobar';
                model.password = 'abc';
                model.confirmPassword = 'def';

                // Act
                let results = validator.validate();

                // Assert
                expect(results).toBeDefined();
                expect(results.isValid).toBe(false);

                let errors = results.errors;
                expect(errors.length).toBe(3);
                expect(errors[0].field).toBe('email');
                expect(errors[0].errors[0]).toBe('Email address is not a valid email address');
                expect(errors[1].field).toBe('password');
                expect(errors[1].errors[0]).toBe('Password must be at least 10 characters long');
                expect(errors[2].field).toBe('confirmPassword');
                expect(errors[2].errors[0]).toBe('Passwords must match');
            });
        });
    });

    describe('Field Validations', () => {
        describe('When @Required decorator on field', () => {
            describe('And field has value', () => {
                it('Should return an error', () => {
                    // Arrange
                    model.email = 'a';

                    // Act
                    let errors = validator.validateField('email');

                    // Assert
                    expect(errors.length).toBe(1);
                    expect(errors[0]).toBe('Email address is not a valid email address');
                });
            });

            describe('And email is valid', () => {
                it('Should not return an error', () => {
                    // Arrange
                    model.email = 'bob@gmail.com';

                    // Act
                    let errors = validator.validateField('email');

                    // Assert
                    expect(errors.length).toBe(0);
                });
            });
        });

        describe('When @Validation decorator on field', () => {
            describe('And predicate evaluates to true', () => {
                it('Should return the custom error', () => {
                    // Arrange
                    model.password = 'foo';
                    model.confirmPassword = 'bar';

                    // Act
                    let errors = validator.validateField('confirmPassword');

                    // Assert
                    expect(errors.length).toBe(1);
                    expect(errors[0]).toBe('Passwords must match');
                });
            });

            describe('And predicate evaluates to false', () => {
                it('Should not return the error', () => {
                    // Arrange
                    model.password = 'password';
                    model.confirmPassword = 'password';

                    // Act
                    let errors = validator.validateField('confirmPassword');

                    // Assert
                    expect(errors.length).toBe(0);
                });
            });
        });

        describe('When @MinLength decorator on field', () => {
            describe('And length is less than min', () => {
                it('Should return an error', () => {
                    // Arrange
                    model.password = 'a';

                    // Act
                    let errors = validator.validateField('password');

                    // Assert
                    expect(errors.length).toBe(1);
                    expect(errors[0]).toBe('Password must be at least 10 characters long');
                });
            });

            describe('And length is greater or equal to min', () => {
                it('Should not return an error', () => {
                    // Arrange
                    model.password = '1234567890';

                    // Act
                    let errors = validator.validateField('password');

                    // Assert
                    expect(errors.length).toBe(0);
                });
            });
        });

        describe('When @MaxLength decorator on field', () => {
            describe('And length is greater than max', () => {
                it('Should return an error', () => {
                    // Arrange
                    model.password = '';
                    for(let i = 0; i < 31; i++) {
                        model.password += 'a';
                    }

                    // Act
                    let errors = validator.validateField('password');

                    // Assert
                    expect(errors.length).toBe(1);
                    expect(errors[0]).toBe('Password can not exceed 30 characters in length');
                });
            });

            describe('And length is less than or equal to max', () => {
                it('Should not return an error', () => {
                    // Arrange
                    model.password = '1234567890';

                    // Act
                    let errors = validator.validateField('password');

                    // Assert
                    expect(errors.length).toBe(0);
                });
            });
        });

        describe('When @Email decorator on field', () => {
            describe('And email is not valid', () => {
                it('Should return an error', () => {
                    // Arrange
                    model.email = 'a';

                    // Act
                    let errors = validator.validateField('email');

                    // Assert
                    expect(errors.length).toBe(1);
                    expect(errors[0]).toBe('Email address is not a valid email address');
                });
            });

            describe('And email is valid', () => {
                it('Should not return an error', () => {
                    // Arrange
                    model.email = 'bob@gmail.com';

                    // Act
                    let errors = validator.validateField('email');

                    // Assert
                    expect(errors.length).toBe(0);
                });
            });
        });

        describe('When @Pattern decorator on field', () => {
            describe('And value does not match the pattern', () => {
                it('Should return an error', () => {
                    // Arrange
                    model.slug = 'foo bar';

                    // Act
                    let errors = validator.validateField('slug');

                    // Assert
                    expect(errors.length).toBe(1);
                    expect(errors[0]).toBe('Must be a valid slug tag');
                });
            });

            describe('And value matches the pattern', () => {
                it('Should not return an error', () => {
                    // Arrange
                    model.slug = 'foo-bar';

                    // Act
                    let errors = validator.validateField('slug');

                    // Assert
                    expect(errors.length).toBe(0);
                });
            });
        });

        describe('When @Alpha decorator on field', () => {
            describe('And value contains non-alpha characters', () => {
                it('Should return an error', () => {
                    // Arrange
                    model.alphaField = 'foAo!';

                    // Act
                    let errors = validator.validateField('alphaField');

                    // Assert
                    expect(errors.length).toBe(1);
                    expect(errors[0]).toBe('Field must only contain alphabetic characters');
                });
            });

            describe('And value contains only alphabetic characters', () => {
                it('Should not return an error', () => {
                    // Arrange
                    model.alphaField = 'ABCabc';

                    // Act
                    let errors = validator.validateField('alphaField');

                    // Assert
                    expect(errors.length).toBe(0);
                });
            });
        });

        describe('When @AlphaNumeric decorator on field', () => {
            describe('And value contains non-alphanumeric characters', () => {
                it('Should return an error', () => {
                    // Arrange
                    model.alphaNumericField = 'fooABC123-a';

                    // Act
                    let errors = validator.validateField('alphaNumericField');

                    // Assert
                    expect(errors.length).toBe(1);
                    expect(errors[0]).toBe('Alpha numeric field must only contain alphanumeric characters');
                });
            });

            describe('And value contains only alphabetic characters', () => {
                it('Should not return an error', () => {
                    // Arrange
                    model.alphaNumericField = 'ABC123abc';

                    // Act
                    let errors = validator.validateField('alphaNumericField');

                    // Assert
                    expect(errors.length).toBe(0);
                });
            });
        });
    });
});