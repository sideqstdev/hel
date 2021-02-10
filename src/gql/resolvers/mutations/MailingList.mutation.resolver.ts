import { mailingListResponse } from "../../responses/MailingList.response";
import { Resolver, Mutation, Arg } from "type-graphql";
import { mailingListInput } from "../../inputs/MailingList.input";
import { MailingListEntity } from "../../../orm/entity/MailingList.entity";
import LoggingService from "../../../util/logging/Logging.service";
import { sendMailingListAddEmail } from "../../../util/services/Email.service";

@Resolver()
export class MailingListMutation{
    @Mutation(() => mailingListResponse)
    async mailingList(@Arg('input') {email}: mailingListInput): Promise<mailingListResponse> {
        
        const mailingMember = new MailingListEntity();

        let response = new mailingListResponse();

        try{
            mailingMember.email = email
            await mailingMember.save()
            if(!await sendMailingListAddEmail(email)){
                response.submitted = false;
            }else{
                LoggingService.info(`Added ${email} to the mailing list`);
                response.submitted = true;
            }
            
        }
        catch(err){
            response.submitted = false;
            LoggingService.error(`Error whilst adding ${email} to the mailing list: ${err}`)
        }
        finally{
            return response;
        }
    }
}