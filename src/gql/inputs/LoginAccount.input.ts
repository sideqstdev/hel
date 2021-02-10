import { InputType, Field } from "type-graphql";

@InputType()
export class loginAccountInput {

    @Field(() => String)
    email: string;

    @Field(() => String)
    password: string
}