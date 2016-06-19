import ValidationManager from '../../src/validation-manager';
import RequiredFieldValidator from '../../src/validators/required';
import {expect} from 'chai';

describe('ValidationManager', () => {
    // Test data
    let myClass: Function;

    beforeEach(() => {
        myClass = class myClass {
            foo = '';
        };
    });

    describe('ValidationManager.get(target)', () => {
        describe('when no existing manager on target class', () => {
            it('should create a new one', () => {
                // Precondition
                expect(myClass.prototype[ValidationManager.ValidationsKey]).to.be.undefined;

                // Act
                let manager = ValidationManager.get(myClass.prototype);

                // Assert
                expect(manager).to.exist;
                expect(myClass.prototype[ValidationManager.ValidationsKey]).to.equal(manager);
            });
        });

        describe('when manager already exists', () => {
            it('should return existing manager', () => {
                // Arrange
                ValidationManager.get(myClass.prototype);

                // Precondition
                expect(myClass.prototype[ValidationManager.ValidationsKey]).to.exist;

                // Act
                let manager = ValidationManager.get(myClass.prototype);

                // Assert
                expect(manager).to.exist;
                expect(myClass.prototype[ValidationManager.ValidationsKey]).to.equal(manager);
            });
        });
    });

    describe('setFriendlyName', () => {
        it('should set the field name', () => {
            // Arrange
            let manager = ValidationManager.get(myClass.prototype);

            // Act
            manager.setFieldName('foo', 'The Foo Fighters');

            // Assert
            let opts = manager.getFieldOptions('foo');
            expect(opts.getFriendlyName()).to.equal('The Foo Fighters');
        });
    });

    describe('addValidator', () => {
        it('should add a validator for the property passed', () => {
            // Arrange
            let manager = ValidationManager.get(myClass.prototype);

            // Act
            manager.addValidator('bar', new RequiredFieldValidator());

            // Assert
            let opts = manager.getFieldOptions('bar');
            expect(opts).to.exist;

            let validators = opts.getValidators();
            expect(validators.length).to.equal(1);
            expect(validators[0] instanceof RequiredFieldValidator).to.equal(true);
        });
    });
});