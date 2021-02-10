import { InputType, Field } from "type-graphql";

@InputType()
export class confirmAccountInput {

    @Field(() => String)
    code: string;

    @Field(() => String, {nullable: true})
    userId?: string;
}