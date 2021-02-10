import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator } from "class-validator";
import { UserEntity } from "../../orm/entity/User.entity";

@ValidatorConstraint({async: true})
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
    validate(email: string){
        let user = UserEntity.findOne({
            where: {
                email: email.toLowerCase(),
            },
        })
        let duplicate = user ? true : false;
        return duplicate;
    }
}

export const IsEmailUnique = (validationOptions?: ValidationOptions) => {
    return (object: unknown, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailUniqueConstraint,
        })
    }
}