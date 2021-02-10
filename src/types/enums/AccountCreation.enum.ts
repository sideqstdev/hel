import { registerEnumType } from "type-graphql";

export enum AccountResponseCode {
    SUCCESS = 0,
    ERROR = 1,
    DUPLICATE = 2,
    INVALID = 3,
}

registerEnumType(AccountResponseCode, {
    name: "AccountResponseCode"
})