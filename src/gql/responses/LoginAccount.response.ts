import { ObjectType, Field } from "type-graphql";
import { UserEntity } from "../../orm/entity/User.entity";

@ObjectType()
export class loginAccountResponse {

    @Field(() => Boolean)
    success: boolean;

    @Field(() => UserEntity, {nullable: true})
    user?: UserEntity;

    @Field(() => String, {nullable: true, description: "Notices for the account in question"})
    notices?: string;

    @Field(() => String)
    details: string;
    
}