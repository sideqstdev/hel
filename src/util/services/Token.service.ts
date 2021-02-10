import { UserEntity } from "../../orm/entity/User.entity";
import {sign, verify} from 'jsonwebtoken'
import * as jwt from 'jsonwebtoken'
import LoggingService from "../logging/Logging.service";
import { IAuthUser } from "../../types/interfaces/AuthUser.interface";
import { promisify } from "util";
import { TokenTypes } from "../../types/types/TokenTypes.type";
import { Response } from 'express-serve-static-core'
import { devMode } from "../globals";

const aSecret = process.env.ACCESS_TOKEN_SECRET;
const rSecret = process.env.REFRESH_TOKEN_SECRET;
const verifyAsync = promisify(jwt.verify).bind(jwt)

export const createToken = (user: UserEntity): string => {
    try{
        const token = sign(
            {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            aSecret,
            {
                expiresIn: "15m"
            }
        );
        return token;
    }
    catch(err){
        throw new Error(`Error whilst creating token: (${err})`)
    }
    
}

export const createRefreshToken = (user: UserEntity): string => {
    try{
        const token = sign(
            {
                id: user.id,
                version: user.version,
            },
            rSecret,
            {
                expiresIn: "14d"
            }
        );
        return token;
    }
    catch(err){
        throw new Error(`Error whilst creating refresh token: (${err})`)
    }
}

export const decodeToken = async(token: string, type?: TokenTypes): Promise<IAuthUser|null> => {

    const secret = type === "refresh" ? rSecret : aSecret;

    try{
        return await verifyAsync(token, secret);
    }
    catch(err){
        return null;
    }
}

export const sendAccessToken = (res: Response, token: string): void => {
    if(devMode){
        res.cookie("sqst", token, {
            httpOnly: true,
            domain: `localhost`
        })
    }else{
        res.cookie("sqst", token, {
            httpOnly: true,
            domain: process.env.URL,
            secure: true,
            sameSite: "none"
        })
    }
}

export const sendRefreshToken = (res: Response, token: string): void => {
    if(devMode){
        res.cookie("sqst_session", token, {
            httpOnly: true,
            domain: `localhost`
        })
    }else{
        res.cookie("sqst_session", token, {
            httpOnly: true,
            domain: process.env.URL,
            secure: true,
            sameSite: "none",
        })
    }
}