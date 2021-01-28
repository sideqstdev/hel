import { Resolver, Query, Ctx } from "type-graphql";
import { ContextInterface } from "../../types/interfaces/Context.interface";

@Resolver()
export class StatusResolver {
    @Query(() => String)
    async status(@Ctx() ctx: ContextInterface): Promise<String>{
        return 'Sideqst gql server is operating normally'
    }
}