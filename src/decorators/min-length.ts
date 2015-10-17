import Length from './length';

export default function MinLength(minLength: number, message?: string): PropertyDecorator {
    return Length(minLength, null, message);
}