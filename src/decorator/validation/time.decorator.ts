import { ValidationArguments, ValidationOptions, registerDecorator } from "class-validator";
import { TIME_REGEX } from "src/regex";

export function IsTime(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsTime',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return TIME_REGEX.test(value.toUpperCase());
                }
            },
        });
    };
}