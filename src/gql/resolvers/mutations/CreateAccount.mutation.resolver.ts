import { Resolver, Mutation, Arg } from "type-graphql";
import { createAccountResponse } from "../../responses/CreateAccount.response";
import { createAccountInput } from "../../inputs/CreateAccount.input";
import { encrypt, generateCode } from "../../../util/auth/Encryption";
import { validateEmail, validateUsername } from "../../../util/services/Validation.service";
import { devMode } from "../../../util/globals";
import { UserEntity } from "../../../orm/entity/User.entity";
import LoggingService from "../../../util/logging/Logging.service";
import { sendConfirmationEmail } from "../../../util/services/Email.service";
import { contains } from "class-validator";
import { AccountResponseCode } from "../../../types/enums/AccountCreation.enum";

@Resolver()
export class CreateAccountMutation{
    @Mutation(() => createAccountResponse)
    async createAccount(@Arg('input') {password, username, email, industry}: createAccountInput): Promise<createAccountResponse> {

        // hash password first
        const hashedPassword: string = await encrypt(password);

        // create response
        let response = new createAccountResponse();

        // create user
        let user = new UserEntity();

        try{
            // need to make these validators at some point
            if(validateEmail(email)){
                if(validateUsername(username)){
                    // build user object
                    
                    user.email = email;
                    user.username = username;
                    user.password = hashedPassword;
                    user.industry = industry.toString();

                    

                    // email confirmation code generator
                    let code = generateCode(6);

                    user.emailCode = code;

                    try{
                        await user.save();

                        // email service sits here
                        if(!await sendConfirmationEmail(code, user.email)){
                            response.created = false;
                            response.user = null;
                        }

                        LoggingService.info(`Account created for ${user.email}`)
                        response.details = `Successfully created account: ${user.email}`;
                        response.responseCode = AccountResponseCode.SUCCESS;
                        response.created = true;
                    }
                    catch(err){
                        // duplicate account
                        if(err.toString().includes("duplicate")){
                            LoggingService.warn(`Account already exists`)
                            response.details = `Provided email or username is already in use by another account`;
                            response.responseCode = AccountResponseCode.DUPLICATE;
                        }else {
                            LoggingService.error(`Account creation error: (${err})`);
                            response.details = `An error occurred whilst creating your account please try again later`;
                            response.responseCode = AccountResponseCode.ERROR;
                        }
                        response.created = false;
                    }
                }
                else{
                    LoggingService.warn(`Username: ${username} was invalid`);
                    response.details = `Username is invalid`;
                    response.responseCode = AccountResponseCode.INVALID;
                    response.created = false;
                }
            }
            else{
                response.details = `Email is invalid`;
                response.responseCode = AccountResponseCode.INVALID;
                response.created = false;
                LoggingService.warn(`Email: ${email} was invalid`);
            }
        }
        catch(err){
            // logs error with time code
            LoggingService.error(`${new Date().toUTCString()}: ${err}`);
            response.details = `Internal server error`;
            response.responseCode = AccountResponseCode.ERROR;
            response.created = false;
        }
        finally{
            // return response
            response.user = response.created ? user : null;
            return response;
        }
        
    }
}