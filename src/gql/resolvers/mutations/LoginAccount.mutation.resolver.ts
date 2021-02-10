import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { loginAccountResponse } from "../../responses/LoginAccount.response";
import { loginAccountInput } from "../../inputs/LoginAccount.input";
import { UserEntity } from "../../../orm/entity/User.entity";
import { compare } from "bcryptjs";
import { createRefreshToken, createToken, sendAccessToken, sendRefreshToken } from "../../../util/services/Token.service";
import { IContext } from "../../../types/interfaces/Context.interface";
import LoggingService from "../../../util/logging/Logging.service";

@Resolver()
export class LoginAccountMutation{
    @Mutation(() => loginAccountResponse)
    async loginAccount(@Arg('input') {email, password}: loginAccountInput, @Ctx() ctx: IContext): Promise<loginAccountResponse> {

        let response = new loginAccountResponse

        // declare empty user
        let user: UserEntity;

        try{
            user = await UserEntity.findOne({
                where: {email: email}
            });
            if(!user){
                response.success = false;
                response.details = `Incorrect username`;
            }else{
                const login = await compare(password, user.password)

                if(!login){
                    response.success = false;
                    response.details = `Incorrect password`;
                }else{
                    // update last login
                    user.lastLogin = new Date();

                    // save user object
                    await user.save()

                    // create and send tokens
                    const refreshToken: string = createRefreshToken(user);
                    const accessToken: string = createToken(user);

                    sendRefreshToken(ctx.response, refreshToken)
                    sendAccessToken(ctx.response, accessToken)

                    response.success = true;
                    response.details = `Successful login`
                }
            }
        }
        catch(err){
            LoggingService.error(`Internal server error: ${err}`)
            response.success = false;
            response.details = `Internal server error`
        }
        finally{
            response.user = response.success ? user : null;
            return response
        }
    }
}