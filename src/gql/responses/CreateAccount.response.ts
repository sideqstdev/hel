import { ObjectType, Field } from "type-graphql";
import { UserEntity } from "../../orm/entity/User.entity";
import { AccountResponseCode } from "../../types/enums/AccountCreation.enum";

@ObjectType()
export class createAccountResponse {
    
    @Field(() => Boolean)
    created: boolean;

    @Field(() => String)
    details: string;

    @Field(() => AccountResponseCode)
    responseCode: AccountResponseCode;

    @Field(() => UserEntity, {nullable: true})
    user?: UserEntity;
}