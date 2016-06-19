import CustomValidator from '../../../src/validators/custom';
import {expect} from 'chai';

describe('Custom validator', () => {
    class MyModel {
        ssn = '';
    }

    let validator: CustomValidator<MyModel> = null;
    let model: MyModel = null;

    beforeEach(() => {
        validator = new CustomValidator<MyModel>((proposeValue: any, m: MyModel) => m.ssn !== proposeValue, "Don't do that");
        model = new MyModel();
    });

    describe('isValid', () => {
        describe('When the predicate returns false', () => {
            it('Should be invalid', () => {
                // Arrange
                model.ssn = '999-99-9999';

                // Act
                let valid = validator.isValid('999-99-9999', model);

                // Assert
                expect(valid).to.equal(false);
            });
        });

        describe('When the predicate returns true', () => {
            it('Should be valid', () => {
                // Arrange
                model.ssn = '999-99-9999';

                // Act
                let valid = validator.isValid('foo', model);

                // Assert
                expect(valid).to.equal(true);
            });
        });
    });
});