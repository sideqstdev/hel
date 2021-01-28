import { ObjectType, Field, Int } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Column } from "typeorm";
import { UserEntity } from "./User.entity";

@ObjectType("Post")
@Entity({name: "post"})
export class PostEntity extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @CreateDateColumn({name: "created", type: "timestamp with time zone"})
    created: Date;

    @Field()
    @UpdateDateColumn({name: "updated", type: "timestamp with time zone"})
    updated: Date;

    @Field(() => UserEntity)
    @ManyToOne(() => UserEntity, user => user.posts)
    user: UserEntity;

    @Field()
    @Column()
    content: string;

    @Field(() => Int, {defaultValue: 0})
    @Column({default: 0})
    likes: number;

    @Field(() => [String])
    @Column("text", {array: true, nullable: true})
    tags: string[];

    @Field(() => Int, {defaultValue: 0})
    @Column({default: 0})
    impressions: number;
}