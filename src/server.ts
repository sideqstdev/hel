require('dotenv').config()
import 'module-alias';
import {createConnection} from 'typeorm';
import LoggingService from "./util/logging/Logging.service";
import { connectDatabase } from './util/database/ConnectDatabase';
import { createSchema } from './util/schema/CreateSchema';
import {ApolloServer} from 'apollo-server'
import { SetContext } from './util/auth/SetContext';

const start = async() => {

    const dev: boolean = process.env.DEV_MODE === "true";

    // Database Connection
    try{
        await connectDatabase()
        LoggingService.info(`Connected to database at ${process.env.DB_HOST}`);
        
    }
    catch(err){
        LoggingService.error(`An error occurred whilst connecting to the database: ${err}`)
    }

    // GraphQL Schema Init
    try{
        const schema = await createSchema()

        const server = new ApolloServer({
            schema,
            context: SetContext,
            playground: dev,
            cors: {
                credentials: true,
                origin: "*",
            },
            logger: {
                debug: msg => LoggingService.debug(msg),
                info: msg => LoggingService.info(msg),
                warn: msg => LoggingService.warn(msg),
                error: msg => LoggingService.error(msg),
            },
            formatError: (err): Error => {
                if(dev){
                    LoggingService.error(JSON.stringify(err, null, 2));
                    return err;
                }
                return err;
            },
            tracing: dev,
        })
        
        try{
            const port: number = Number(process.env.PORT)
            if(!port){
                LoggingService.warn(`No port was defined in the env`)
            }
            const {url} = await server.listen({
                port: port || 7000,
                host: dev ? "0.0.0.0" : undefined,
            })
            LoggingService.info(`Server listening @${url}`)
        }
        catch(err){
            LoggingService.error(`Server failed to listen: (${err})`)
        }
        
    }
    catch(err){
        LoggingService.error(`Error while initializing Apollo Server: (${err})`)
        LoggingService.error(`Error details: ${err.details}`)
    }
}
start();