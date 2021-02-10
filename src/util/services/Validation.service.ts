import validator from 'validator'
import * as banned_usernames from '../../../data/banned_usernames.json'
import * as reserved_usernames from '../../../data/reserved_usernames.json'

export const validateEmail = (email: string): boolean => {
    if(validator.isEmpty(email)){
        return false;
    }
    else{
        return validator.isEmail(email);
    }
}

export const validateUsername = (username: string): boolean | null  => {
    const bannedList: string[] = banned_usernames.data
    const reservedList: string[] = reserved_usernames.data

    if(username.length < 4){
        throw new Error("Username must be of length 4 or longer");
    } else if(!validator.matches(username, "^[a-zA-Z0-9_\.\-]*$")){
        throw new Error("Username must be alphanumeric");
    } else{

        for(let x = 0; x<bannedList.length; x++){
            if(username.includes(bannedList[x])){
                throw new Error("Username contains inappropriate language please change it.");
            }
        }

        for(let y = 0; y<reservedList.length; y++){
            if(username === reservedList[y]){
                // might just return false
                throw new Error("Username is already taken");
            }
        }
        
        return true;
    }
}