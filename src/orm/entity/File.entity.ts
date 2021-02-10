import { ObjectType, Field } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToOne, Column, OneToOne } from "typeorm";
import { UserEntity } from "./User.entity";

@ObjectType("File")
@Entity({name: "file"})
export class FileEntity extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @CreateDateColumn({name: "created", type: "timestamp with time zone"})
    created: Date;

    @UpdateDateColumn({name: "updated", type: "timestamp with time zone"})
    updated: Date;

    @VersionColumn({name: "version", default: 1})
    version: number;

    @ManyToOne(() => UserEntity, {nullable: true})
    user: UserEntity;

    @Field({description: "The uri at which this file exists on the internet."})
    @Column()
    uri: string;
}