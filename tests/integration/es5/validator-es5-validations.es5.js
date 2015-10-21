import {Required} from '../../../src/main';
import {Email} from '../../../src/main';
import {MinLength} from '../../../src/main';
import {Length} from '../../../src/main';
import {FieldName} from '../../../src/main';
import {Validation} from '../../../src/main';
import {Pattern} from '../../../src/main';
import {Validator} from '../../../src/main';

'use strict';

describe('ES5 Validations', () => {
    var Employee = function () {
        this.name = '';
        this.ssn = '';
    }

    Validator.decorate(Employee, {
        name: [
            Required(),
            MinLength(5)
        ],
        ssn: [
            FieldName('Social security number'),
            Required(),
            Validation(
                'Can not be 999-99-9999',
                value => value !== '999-99-9999'
            )
        ]
    });

    var model;

    beforeEach(() => {
        model = new Employee();
    });

    describe('validate', () => {
        describe('When model has validation errors', () => {
            it('Should return validation errors', () => {
                // Arrange
                model.name = 'asd';
                model.ssn = '999-99-9999';

                // Act
                let results = Validator.validate(model);

                // Assert
                expect(results.isValid).toBe(false);
                expect(results.errors.length).toBe(2);
                expect(results.errors[0].field).toBe('name');
                expect(results.errors[0].errors.length).toBe(1);
                expect(results.errors[0].errors[0]).toBe('Field must be at least 5 characters long');
                expect(results.errors[1].field).toBe('ssn');
                expect(results.errors[1].errors.length).toBe(1);
                expect(results.errors[1].errors[0]).toBe('Can not be 999-99-9999');
            });
        });
    });
});