import EmailValidator from '../../../src/validators/email';
import {expect} from 'chai';

describe('Email validator', () => {
    let validator: EmailValidator = null;

    beforeEach(() => validator = new EmailValidator());

    describe('isValid', () => {
        describe('When the field is not a valid email address', () => {
            it('Should be invalid', () => {
                // Act
                let valid = validator.isValid('foo@b.');

                // Assert
                expect(valid).to.equal(false);
            });
        });

        describe('When field is a valid email', () => {
            it('Should be valid', () => {
                // Act
                let valid = validator.isValid('bob@gmail.com');

                // Assert
                expect(valid).to.equal(true);
            });
        });
    });
});