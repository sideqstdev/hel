import { Resolver, Query, Ctx } from "type-graphql";
import { IContext } from "../../types/interfaces/Context.interface";

@Resolver()
export class StatusResolver {
    @Query(() => String)
    async status(@Ctx() ctx: IContext): Promise<String>{
        return 'Sideqst gql server is operating normally'
    }
}