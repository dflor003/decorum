const decorum = require('../../../src');
const Required = decorum.Required;
const Email = decorum.Email;
const MinLength = decorum.MinLength;
const MaxLength = decorum.MaxLength;
const Length = decorum.Length;
const FieldName = decorum.FieldName;
const Validation = decorum.Validation;
const Pattern = decorum.Pattern;
const Validator = decorum.Validator;
const expect = require('chai').expect;

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
                expect(results.isValid).to.equal(false);
                expect(results.errors.length).to.equal(2);
                expect(results.errors[0].field).to.equal('name');
                expect(results.errors[0].errors.length).to.equal(1);
                expect(results.errors[0].errors[0]).to.equal('Field is required');
                expect(results.errors[1].field).to.equal('ssn');
                expect(results.errors[1].errors.length).to.equal(1);
                expect(results.errors[1].errors[0]).to.equal('Please enter a valid social security number');
            });
        });
    });
});