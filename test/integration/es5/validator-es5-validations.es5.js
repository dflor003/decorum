const decorum = require('../../../src');
const Required = decorum.Required;
const Email = decorum.Email;
const MinLength = decorum.MinLength;
const Length = decorum.Length;
const FieldName = decorum.FieldName;
const Validation = decorum.Validation;
const Pattern = decorum.Pattern;
const Validator = decorum.Validator;
const expect = require('chai').expect;

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
                expect(results.isValid).to.equal(false);
                expect(results.errors.length).to.equal(2);
                expect(results.errors[0].field).to.equal('name');
                expect(results.errors[0].errors.length).to.equal(1);
                expect(results.errors[0].errors[0]).to.equal('Field must be at least 5 characters long');
                expect(results.errors[1].field).to.equal('ssn');
                expect(results.errors[1].errors.length).to.equal(1);
                expect(results.errors[1].errors[0]).to.equal('Can not be 999-99-9999');
            });
        });
    });
});