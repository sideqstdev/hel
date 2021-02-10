import { AuthChecker } from "type-graphql";
import { IContext } from "../../types/interfaces/Context.interface";
import { IApolloContext } from "../../types/interfaces/ApolloContext.interface";
import { decodeToken } from "../services/Token.service";

const authChecker: AuthChecker<Partial<IContext>> = async({context}): Promise<boolean> => {
    if(!context){
        return false;
    }

    let {token} = context;
    if(!token){
        return false;
    }
    
    else if(!token.startsWith("Bearer ")){
        return false;
    }

    else{
        token = token.slice(7, token.length);

        const validToken = await decodeToken(token, "access");
        if(validToken){
            context.user = validToken;
            context.token = token;

            // TODO check for email confirmation
            return true;
        }
        else{
            return false;
        }
    }
} 