'use strict';

import {Required} from '../../../src/main';
import {Email} from '../../../src/main';
import {MaxLength} from '../../../src/main';
import {Length} from '../../../src/main';
import {FieldName} from '../../../src/main';
import {Validation} from '../../../src/main';
import {Pattern} from '../../../src/main';
import {Validator} from '../../../src/main';

describe('ES6 Validations', () => {
    class Person {
        constructor() {
            this.name = '';
            this.ssn = '';
        }
    }

    Validator.decorate(Person, {
        name: [
            Required(),
            MaxLength(30)
        ],
        ssn: [
            FieldName('Social security number'),
            Required(),
            Pattern(
                /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/,
                'Please enter a valid social security number'
            )
        ]
    });

    let model;

    beforeEach(() => model = new Person());

    describe('validate', () => {
        describe('When model has validation errors', () => {
            it('Should return validation errors', () => {
                // Arrange
                model.name = '';
                model.ssn = 'foo';

                // Act
                let results = Validator.validate(model);

                // Assert
                expect(results.isValid).toBe(false);
                expect(results.errors.length).toBe(2);
                expect(results.errors[0].field).toBe('name');
                expect(results.errors[0].errors.length).toBe(1);
                expect(results.errors[0].errors[0]).toBe('Field is required');
                expect(results.errors[1].field).toBe('ssn');
                expect(results.errors[1].errors.length).toBe(1);
                expect(results.errors[1].errors[0]).toBe('Please enter a valid social security number');
            });
        });
    });
});