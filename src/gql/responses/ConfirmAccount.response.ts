import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class confirmAccountResponse {

    @Field(() => Boolean, {description: "Whether or not the code was successful in confirming the account creation", defaultValue: false})
    success: boolean;

    @Field(() => String, {description: "Redirect url to users account", nullable: true, defaultValue: "https://sideqst.com"})
    redirect: string;
}