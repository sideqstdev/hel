import { genSalt, hash, compare } from "bcryptjs"
import { randomBytes } from "crypto";

export const encrypt = async(value: string) => {
    const salt: any = await genSalt();
    // note to test the speed of generating the salt here

    // hash the value
    const hashed = await hash(value, salt);
    return hashed;
}

// This is a simple wrapper for random bytes for now will get more complicated if codes need to hold data
export const generateCode = (length: number) => {
    return randomBytes(length).toString('hex').toUpperCase()
}