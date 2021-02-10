import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class mailingListResponse {

    @Field(() => Boolean)
    submitted: boolean;
}