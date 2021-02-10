import { Resolver, Mutation, Arg } from "type-graphql";
import { confirmAccountResponse } from "../../responses/ConfirmAccount.response";
import { confirmAccountInput } from "../../inputs/ConfirmAccount.input";
import { UserEntity } from "../../../orm/entity/User.entity";
import LoggingService from "../../../util/logging/Logging.service";

@Resolver()
export class ConfirmAccountMutation{
    @Mutation(() => confirmAccountResponse)
    async confirmAccount(@Arg('input') {userId, code}: confirmAccountInput): Promise<confirmAccountResponse> {

        // create response
        let response = new confirmAccountResponse();

        try{
            // if userId is provided look in their object otherwise look at the whole
            if(userId){
                console.log(code)
                const user = await UserEntity.findOne({
                    where: {id: userId}
                })
                
                if(!user){
                    response.success = false;
                    response.redirect = null;
                    LoggingService.warn(`No user exists with id: ${userId} to confirm`)
                }else{
                    if(code === user.emailCode){
                        LoggingService.info(`${user.email} has been confirmed`)
                        response.success = true;
                        response.redirect = `https://sideqst.com/profile/${user.username}`;
                        user.activated = true;
                        user.emailCode = null;
                        await user.save();
                    }else {
                        LoggingService.warn(`Email code doesn't match`)
                        response.success = false;
                        response.redirect = null;
                    }
                }
            }else {
                const user = await UserEntity.findOne({
                    where: {emailCode: code}
                })
                if(!user){
                    response.success = false;
                    response.redirect = null;
                    LoggingService.warn(`No user exists that has a confirmation code: ${code}`)
                }else {
                    LoggingService.info(`${user.email} has been confirmed`)
                    response.success = true;
                    response.redirect = `https://sideqst.com/profile/${user.username}`;
                    user.activated = true;
                    user.emailCode = null;
                    await user.save();
                }
            }
        }
        catch(err){
            LoggingService.error(`There was an error whilst confirming an account: (${err})`)
            response.success = false;
            response.redirect = null;
        }
        finally{
            return response
        }
        
    }
}