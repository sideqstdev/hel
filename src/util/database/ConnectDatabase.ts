import { Connection, createConnection } from "typeorm";
import { UserEntity } from "../../orm/entity/User.entity";
import { JobEntity } from "../../orm/entity/Job.entity";
import { CompanyEntity } from "../../orm/entity/Company.entity";
import { ImageEntity } from "../../orm/entity/Image.entity";
import { PostEntity } from "../../orm/entity/Post.entity";
import { ApplicationEntity } from "../../orm/entity/Application.entity";
import { FileEntity } from "../../orm/entity/File.entity";
import { MailingListEntity } from "../../orm/entity/MailingList.entity";

const dev: boolean = process.env.DEV_MODE === "true";

export const connectDatabase = async(): Promise<Connection> => {
    return createConnection(
        {
            type: "postgres",
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE,
            entities: [UserEntity, JobEntity, CompanyEntity, ImageEntity, PostEntity, ApplicationEntity, FileEntity, MailingListEntity],
            uuidExtension: "pgcrypto",
            synchronize: dev ? true : false,
        }
    )
}