import MinLengthValidator from '../../../src/validators/min-length';

describe('MinLength validator', () => {
    let validator: MinLengthValidator = null;

    beforeEach(() => validator = new MinLengthValidator(3));

    describe('isValid', () => {
        describe('When the field length is less than the min length', () => {
            it('Should return an error', () => {
                // Act
                let valid = validator.isValid('12');

                // Assert
                expect(valid).toBe(false);
            });
        });

        describe('When field length is equal to the min length', () => {
            it('Should not return an error', () => {
                // Act
                let valid = validator.isValid('123');

                // Assert
                expect(valid).toBe(true);
            });
        });

        describe('When field length is greater than the min length', () => {
            it('Should not return an error', () => {
                // Act
                let valid = validator.isValid('1234');

                // Assert
                expect(valid).toBe(true);
            });
        });
    });
});