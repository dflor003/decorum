import RequiredFieldValidator from '../../../src/validators/required';

describe('Required validator', () => {
    let validator: RequiredFieldValidator = null;

    beforeEach(() => validator = new RequiredFieldValidator());

    describe('isValid', () => {
        describe('When the field is an empty string', () => {
            it('Should be invalid', () => {
                // Act
                let valid = validator.isValid('');

                // Assert
                expect(valid).toBe(false);
            });
        });

        describe('When field is whitespace', () => {
            it('Should be invalid', () => {
                // Act
                let valid = validator.isValid('     ');

                // Assert
                expect(valid).toBe(false);
            });
        });

        describe('When field is null', () => {
            it('Should be invalid', () => {
                // Act
                let valid = validator.isValid(null);

                // Assert
                expect(valid).toBe(false);
            });
        });

        describe('When field is undefined', () => {
            it('Should be invalid', () => {
                // Act
                let valid = validator.isValid(null);

                // Assert
                expect(valid).toBe(false);
            });
        });

        describe('When field is not empty', () => {
            it('Should be valid', () => {
                // Act
                let valid = validator.isValid('some value');

                // Assert
                expect(valid).toBe(true);
            });
        });
    });
});