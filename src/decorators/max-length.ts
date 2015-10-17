import Length from './length';

export default function MaxLength(maxLength: number, message?: string): PropertyDecorator {
    return Length(null, maxLength, message);
}