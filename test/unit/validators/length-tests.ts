import LengthValidator from '../../../src/validators/length';
import {expect} from 'chai';

describe('Length validator', () => {
    let validator: LengthValidator = null;

    beforeEach(() => validator = new LengthValidator(5, null));

    describe('isValid', () => {
        describe('When the field length is not the passed length', () => {
            it('Should be invalid', () => {
                // Act
                let valid = validator.isValid('1234567');

                // Assert
                expect(valid).to.equal(false);
            });
        });

        describe('When field length is equal to the passed length', () => {
            it('Should be valid', () => {
                // Act
                let valid = validator.isValid('12345');

                // Assert
                expect(valid).to.equal(true);
            });
        });
    });
});