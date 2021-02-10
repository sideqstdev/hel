import { IAuthUser } from "./AuthUser.interface";

export interface IContext {
    token?: string;
    headers: { [key: string ]: unknown},
    request: any,
    response: any,
    req: any,
    res: any,
    user: IAuthUser
}