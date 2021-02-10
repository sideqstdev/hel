import { join } from "path";
import { buildSchema } from "type-graphql";
import LoggingService from "../logging/Logging.service";

const resolvers = join(__dirname + "../../../gql/resolvers/") + "**/*.resolver"
LoggingService.info(`Resolvers are located @${resolvers}`)

const dev: boolean = process.env.DEV_MODE === "true";

export const createSchema = () => buildSchema({
    resolvers: [
        `${resolvers}.js`, `${resolvers}.ts`
    ],
    skipCheck: dev ? false : true,
    validate: true,
    emitSchemaFile: true,
})