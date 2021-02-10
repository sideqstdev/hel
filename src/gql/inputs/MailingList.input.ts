import { InputType, Field } from "type-graphql";
import { IsEmail } from "class-validator";

@InputType()
export class mailingListInput {

    @Field(() => String, {description: "Email address for signing up for the mailing list for sideqst"})
    @IsEmail()
    email: string
}