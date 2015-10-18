import PatternValidator from '../../../src/validators/pattern';

describe('Pattern validator', () => {
    let validator: PatternValidator = null;

    beforeEach(() => validator = new PatternValidator(/^[0-9]+$/));

    describe('isValid', () => {
        describe('When the field does not match the pattern', () => {
            it('Should return an error', () => {
                // Act
                let valid = validator.isValid('123A4');

                // Assert
                expect(valid).toBe(false);
            });
        });

        describe('When field matches the pattern', () => {
            it('Should not return an error', () => {
                // Act
                let valid = validator.isValid('42');

                // Assert
                expect(valid).toBe(true);
            });
        });
    });
});