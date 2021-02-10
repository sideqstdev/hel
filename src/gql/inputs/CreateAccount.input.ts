import { InputType, Field } from "type-graphql";
import { JobType } from "../../types/enums/JobType.enum";
import { MinLength, IsEmail} from "class-validator";
import { IsEmailUnique } from "../../util/validators/IsUnique.validator";

@InputType()
export class createAccountInput {

    @Field(() => String)
    @MinLength(3)
    // TODO add validators to username
    username: string;

    @Field(() => String)
    @IsEmail()
    email: string;

    @Field(() => String)
    @MinLength(6)
    password: string;

    @Field(() => [JobType], {nullable: true})
    industry?: JobType[];
}