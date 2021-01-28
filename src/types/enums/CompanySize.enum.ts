import { registerEnumType } from "type-graphql";

export enum CompanySize {
    MICRO = "1-10 Employees",
    SMALL = "11-50 Employees",
    MEDIUM_LOW = "51-100 Employees",
    MEDIUM_HIGH = "101-250 Employees",
    LARGE_LOW = "251-500 Employees",
    LARGE_HIGH = "501-1000 Employees",
    ENTERPRISE = "1000+ Employees",
    NONE = "Num of Employees not Provided"
}

registerEnumType(CompanySize, {
    name: "CompanySize"
})