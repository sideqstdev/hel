import { ObjectType, Field } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Index } from "typeorm";

@ObjectType("MailingList")
@Entity({name: "mailinglist"})
export class MailingListEntity extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @CreateDateColumn({name: "created", type: "timestamp with time zone"})
    created: Date;

    @UpdateDateColumn({name: "updated", type: "timestamp with time zone"})
    updated: Date;

    @Field(() => String, {description: `Email address for hearing more about sideqst`})
    @Column({unique: true})
    @Index()
    email: string;
}