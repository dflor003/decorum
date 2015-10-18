import {Required} from '../../../src/main';
import {Email} from '../../../src/main';
import {MaxLength} from '../../../src/main';
import {Length} from '../../../src/main';
import {FieldName} from '../../../src/main';
import {Validation} from '../../../src/main';
import {Pattern} from '../../../src/main';
import {Validator} from '../../../src/main';

'use strict';

describe('ES7 Decorator-based validations', () => {
    class RegistrationModel {
        @Required()
        username = '';

        @FieldName('Email address')
        @Required()
        @Email()
        email = '';

        @FieldName('Password')
        @Length(10, 30)
        password = '';

        @FieldName('Confirm password')
        @Validation(
            'Passwords must match',
            (value, model) => value === model.password
        )
        confirmPassword = '';

        @Pattern(/^[a-z0-9-]+$/, 'Must be a valid slug tag')
        slug = '';

        constructor() {
            this.myProperty = 'foo';
        }

        @MaxLength(3)
        get myProperty() { return this._myProp; }
        set myProperty(value) { this._myProp = value; }
    }

    var model = null;
    var validator = null;

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
                expect(errors[1].errors[0]).toBe('Password must be between 10 and 30 characters long');
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

        describe('When @Length decorator on field', () => {
            describe('And length is less than min', () => {
                it('Should return an error', () => {
                    // Arrange
                    model.password = 'a';

                    // Act
                    let errors = validator.validateField('password');

                    // Assert
                    expect(errors.length).toBe(1);
                    expect(errors[0]).toBe('Password must be between 10 and 30 characters long');
                });
            });

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
                    expect(errors[0]).toBe('Password must be between 10 and 30 characters long');
                });
            });

            describe('And length is in range', () => {
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
    });
});