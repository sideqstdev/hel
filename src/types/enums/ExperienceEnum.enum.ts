import { registerEnumType } from "type-graphql";

export enum Experience {
    ENTRY,
    JUNIOR,
    ASSOCIATE,
    SENIOR,
    EXECUTIVE
}

registerEnumType(Experience, {
    name: "Experience"
})